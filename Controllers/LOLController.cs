using LOLIllustratedBook.Models;
using LOLIllustratedBook.ViewModels;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;

namespace LOLIllustratedBook.Controllers
{
    public class LOLController : Controller
    {
        private readonly LOLIllustratedBook_DbContext dbContext;
        public LOLController(LOLIllustratedBook_DbContext _dbContext)
        {
            dbContext = _dbContext;
        }

        public async Task<IActionResult> Menu(string? tag = null, string? state = null, string? search = null, int ststeValue = 0)
        {
            var source = dbContext.Champion.ToList();
            var source_Info = dbContext.Info.ToList();
            var source_States = dbContext.States.ToList();
            var data = source.Select(d => new DTOChampion()
            {
                Id = d.Id,
                Name = d.Name,
                Blurb = d.Blurb,
                Partype = d.Partype,
                Tags = d.Tags,
                Title = d.Title,
                Defense = source_Info.First(t => t.Id == d.Id).Defense,
                Difficulty = source_Info.First(t => t.Id == d.Id).Difficulty,
                Attack = source_Info.First(t => t.Id == d.Id).Attack,
                Magic = source_Info.First(t => t.Id == d.Id).Magic,
                Armor = source_States.First(t => t.Id == d.Id).Armor,
                Armorperlevel = source_States.First(t => t.Id == d.Id).Armorperlevel,
                Attackdamage = source_States.First(t => t.Id == d.Id).Attackdamage,
                Attackdamageperlevel = source_States.First(t => t.Id == d.Id).Attackdamageperlevel,
                Attackrange = source_States.First(t => t.Id == d.Id).Attackrange,
                Attackspeed = source_States.First(t => t.Id == d.Id).Attackspeed,
                Attackspeedperlevel = source_States.First(t => t.Id == d.Id).Attackspeedperlevel,
                Crit = source_States.First(t => t.Id == d.Id).Crit,
                Critperlevel = source_States.First(t => t.Id == d.Id).Critperlevel,
                Hp = source_States.First(t => t.Id == d.Id).Hp,
                Hpperlevel = source_States.First(t => t.Id == d.Id).Hpperlevel,
                Hpregen = source_States.First(t => t.Id == d.Id).Hpperlevel,
                Hpregenperlevel = source_States.First(t => t.Id == d.Id).Hpperlevel,
                Movespeed = source_States.First(t => t.Id == d.Id).Movespeed,
                Mp = source_States.First(t => t.Id == d.Id).Mp,
                Mpperlevel = source_States.First(t => t.Id == d.Id).Mpperlevel,
                Mpregen = source_States.First(t => t.Id == d.Id).Mpregen,
                Mpregenperlevel = source_States.First(t => t.Id == d.Id).Mpregenperlevel,
                Spellblock = source_States.First(t => t.Id == d.Id).Spellblock,
                Spellblockperlevel = source_States.First(t => t.Id == d.Id).Spellblockperlevel,
                ImageURL = $"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{d.Id}_0.jpg",
            }).ToList();
            // ����^�����
            if (data.Count != 152)
            {
                await GetChampionDataAsync();
            }
            var states = new List<SelectListItem>()
            {
                new() { Text = "����", Value = string.Empty },
                new() { Text = "�����O", Value = "Attack" },
                new() { Text = "�]�O", Value = "Magic" },
                new() { Text = "���m�O", Value = "Defense" },
                new() { Text = "����", Value = "Difficulty" }
            };
            var championTags = new List<SelectListItem>()
            {
                new() { Text = "����" , Value = string.Empty },
                new() { Text = "���" , Value = "Assassin" },
                new() { Text = "�Ԥh" , Value = "Fighter" },
                new() { Text = "�k�v" , Value = "Mage" },
                new() { Text = "�g��" , Value = "Marksman" },
                new() { Text = "�䴩" , Value = "Support" },
                new() { Text = "�Z�J" , Value = "Tank" },
            };

            ViewBag.States = states;
            ViewBag.ChampionTags = championTags;
            ViewBag.Search = search;
            ViewBag.StsteValue = ststeValue;

            if (!string.IsNullOrEmpty(search))
                data = data.Where(d => d.Name.Contains(search) || d.Id.Contains(search)).ToList(); // �ھ� search �ѼƹL�o�^�����
            if (!string.IsNullOrEmpty(tag))
                data = data.Where(d => d.Tags.Contains(tag)).ToList();
            if (!string.IsNullOrEmpty(state))
            {
                data = state switch
                {
                    "Attack" => data.Where(d => d.Attack == ststeValue).ToList(),
                    "Magic" => data.Where(d => d.Magic == ststeValue).ToList(),
                    "Defense" => data.Where(d => d.Defense == ststeValue).ToList(),
                    "Difficulty" => data.Where(d => d.Difficulty == ststeValue).ToList(),
                    _ => data
                };
            }
            return View(data);
        }

        // �ھڭ^�� ID ����^���ԲӸ�ƨ����
        public IActionResult ChampionContent(string Id)
        {
            var champion = dbContext.Champion.Find(Id);
            if (champion == null)
                return BadRequest();

            var data = new ChampionData()
            {
                DTO_Champion = champion,
                DTO_Info = dbContext.Info.FirstOrDefault(d => d.Id == Id) ?? new(),
                DTO_Spells = dbContext.Spell.Where(d => d.Id == Id).ToList() ?? [],
                DTO_States = dbContext.States.FirstOrDefault(d => d.Id == Id) ?? new()
            };
            data.DTO_Champion.AllytipList = FormatArray(data.DTO_Champion.Allytips);
            data.DTO_Champion.EnemytipList = FormatArray(data.DTO_Champion.Enemytips);

            ViewData["ProjectName"] = "�^���p����U";
            var newData = new ViewModel()
            {
                �Ĥ@�i�Ϻ��} = $"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{champion.Id}_0.jpg",
                �W�� = champion.Name,
                �ݩ� = champion.Tags.Replace("[", "").Replace("]", "").Replace("\\", "").Replace("\"", "").Split(','),
            };
            ViewBag.Champion = newData;

            var love = dbContext.Love.ToList();
            ViewData["LoveAction"] = love.Any(d => d.Id == Id) ? "�����̷R" : "�[�J�̷R";
            ViewData["LoveActionURL"] = love.Any(d => d.Id == Id) 
                ? Url.Action("RemoveLove", "LoL", new { Id }) 
                : Url.Action("AddLove", "LoL", new { Id });
            return View(data);
        }

        public async Task<IActionResult> Love()
        {
            var love = dbContext.Love.ToList();
            var source = dbContext.Champion.ToList();
            var source_Info = dbContext.Info.ToList();
            var source_States = dbContext.States.ToList();
            var data = source.Select(d => new DTOChampion()
            {
                Id = d.Id,
                Name = d.Name,
                Blurb = d.Blurb,
                Partype = d.Partype,
                Tags = d.Tags,
                Title = d.Title,
                Defense = source_Info.First(t => t.Id == d.Id).Defense,
                Difficulty = source_Info.First(t => t.Id == d.Id).Difficulty,
                Attack = source_Info.First(t => t.Id == d.Id).Attack,
                Magic = source_Info.First(t => t.Id == d.Id).Magic,
                Armor = source_States.First(t => t.Id == d.Id).Armor,
                Armorperlevel = source_States.First(t => t.Id == d.Id).Armorperlevel,
                Attackdamage = source_States.First(t => t.Id == d.Id).Attackdamage,
                Attackdamageperlevel = source_States.First(t => t.Id == d.Id).Attackdamageperlevel,
                Attackrange = source_States.First(t => t.Id == d.Id).Attackrange,
                Attackspeed = source_States.First(t => t.Id == d.Id).Attackspeed,
                Attackspeedperlevel = source_States.First(t => t.Id == d.Id).Attackspeedperlevel,
                Crit = source_States.First(t => t.Id == d.Id).Crit,
                Critperlevel = source_States.First(t => t.Id == d.Id).Critperlevel,
                Hp = source_States.First(t => t.Id == d.Id).Hp,
                Hpperlevel = source_States.First(t => t.Id == d.Id).Hpperlevel,
                Hpregen = source_States.First(t => t.Id == d.Id).Hpperlevel,
                Hpregenperlevel = source_States.First(t => t.Id == d.Id).Hpperlevel,
                Movespeed = source_States.First(t => t.Id == d.Id).Movespeed,
                Mp = source_States.First(t => t.Id == d.Id).Mp,
                Mpperlevel = source_States.First(t => t.Id == d.Id).Mpperlevel,
                Mpregen = source_States.First(t => t.Id == d.Id).Mpregen,
                Mpregenperlevel = source_States.First(t => t.Id == d.Id).Mpregenperlevel,
                Spellblock = source_States.First(t => t.Id == d.Id).Spellblock,
                Spellblockperlevel = source_States.First(t => t.Id == d.Id).Spellblockperlevel,
                ImageURL = $"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{d.Id}_0.jpg",
            }).ToList();
            // ����^�����
            if (data.Count != 152) await GetChampionDataAsync();
            var items = new List<DTOChampion>();
            foreach (var item in love)
            {
                items.Add(data.First(d => d.Id == item.Id));
            }

            

            return View(items);
        }

        public IActionResult AddLove(string Id)
        {
            try
            {
                dbContext.Love.Add(new Love() { Id = Id });
                dbContext.SaveChanges();
            }
            catch 
            {
                return RedirectToAction("Love","LoL");
            }
            return RedirectToAction("Love","LoL");
        }
        public async Task<IActionResult> RemoveLove(string Id)
        {
            try
            {
                var data = dbContext.Love.FirstOrDefault(d => d.Id == Id);
                if (data is null)
                    return await Love();
                dbContext.Love.Remove(data);
                dbContext.SaveChanges();
            }
            catch
            {
                return RedirectToAction("ChampionContent", "LoL", new { Id });
            }
            return RedirectToAction("ChampionContent", "LoL", new { Id });
        }

        // ����C���^���C����Ʈw
        public async Task GetChampionDataAsync()
        {
            using HttpClient client = new();
            HttpResponseMessage response = await client.GetAsync($"https://ddragon.leagueoflegends.com/cdn/10.22.1/data/zh_TW/champion.json");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            var data = JsonConvert.DeserializeObject<JsonData.ChampionData>(responseBody) ?? new();
            data.ChampionList =  data.Data.Values.ToList();
            var champions = data.ChampionList.Select(d => new Champion()
            {
                Id = d.Id,
                Name = d.Name,
                Allytips = JsonConvert.SerializeObject(d.Allytips),
                Blurb = d.Blurb,
                Enemytips = JsonConvert.SerializeObject(d.Enemytips),
                KeyName = d.Key,
                Lore = d.Lore,
                Partype = d.Partype,
                Tags = JsonConvert.SerializeObject(d.Tags),
                Title = d.Title
            }).ToList();
            var info = data.ChampionList.Select(d => new Info()
            {
                Id =d.Id,
                Defense = d.Info.Defense,
                Difficulty = d.Info.Difficulty,
                Attack = d.Info.Attack,
                Magic = d.Info.Magic,
            }).ToList();
            var state = data.ChampionList.Select(d => new States()
            {
                Id = d.Id,
                Armor = d.Stats.Armor,
                Armorperlevel = d.Stats.Armorperlevel,
                Attackdamage = d.Stats.Attackdamage,
                Attackdamageperlevel = d.Stats.Attackdamageperlevel,
                Attackrange = d.Stats.Attackrange,
                Attackspeed = d.Stats.Attackspeed,
                Attackspeedperlevel = d.Stats.Attackspeedperlevel,
                Crit = d.Stats.Crit,
                Critperlevel = d.Stats.Critperlevel,
                Hp = d.Stats.Hp,
                Hpperlevel = d.Stats.Hpperlevel,
                Hpregen = d.Stats.Hpperlevel,
                Hpregenperlevel = d.Stats.Hpperlevel,
                Movespeed = d.Stats.Movespeed,
                Mp = d.Stats.Mp,
                Mpperlevel = d.Stats.Mpperlevel,
                Mpregen = d.Stats.Mpregen,
                Mpregenperlevel = d.Stats.Mpregenperlevel,
                Spellblock = d.Stats.Spellblock,
                Spellblockperlevel = d.Stats.Spellblockperlevel
            }).ToList();
            await dbContext.AddRangeAsync(champions);
            await dbContext.AddRangeAsync(info);
            await dbContext.AddRangeAsync(state);
            await dbContext.SaveChangesAsync();
        }

        public string[] FormatArray(string str) => JsonConvert.DeserializeObject<string[]>(str ?? "") ?? [];
    }
}
