using LOLIllustratedBook.Models;// 引入模型命名空間，包含資料庫實體類別。
using LOLIllustratedBook.ViewModels;// 引入視圖模型命名空間，用於在視圖中使用特定的資料結構。
using Microsoft.AspNetCore.Mvc;// 引入ASP.NET Core MVC的基本功能，例如控制器和動作方法。
using Microsoft.AspNetCore.Mvc.Rendering;// 引入用於生成 HTML 選項元素的功能。
using Newtonsoft.Json;// 引入 JSON 序列化和反序列化的功能，這裡使用的是 Newtonsoft.Json 庫。

namespace LOLIllustratedBook.Controllers
{
    public class LOLController : Controller
    {
        // 定義只讀欄位 dbContext，表示資料庫上下文
        private readonly LOLIllustratedBook_DbContext dbContext;
        // 定義控制器的建構函式，將資料庫上下文注入到控制器中
        public LOLController(LOLIllustratedBook_DbContext _dbContext)
        {
            dbContext = _dbContext;
        }
        // 非同步方法，處理顯示菜單頁面
        public async Task<IActionResult> Menu(string? tag = null, string? state = null, string? search = null, int ststeValue = 0)
        {
            // 從資料庫獲取英雄、信息和狀態的資料
            var source = dbContext.Champion.ToList();
            var source_Info = dbContext.Info.ToList();
            var source_States = dbContext.States.ToList();
            // 將英雄資料轉換為 DTOChampion 對象列表
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
            // 獲取英雄資料
            // 確保英雄資料數量為 152，不足則從 API 獲取
            if (data.Count != 152)
            {
                await GetChampionDataAsync();
            }
            // 定義狀態選項列表
            var states = new List<SelectListItem>()
            {
                new() { Text = "全部", Value = string.Empty },
                new() { Text = "攻擊力", Value = "Attack" },
                new() { Text = "魔力", Value = "Magic" },
                new() { Text = "防禦力", Value = "Defense" },
                new() { Text = "難度", Value = "Difficulty" }
            };
            // 定義英雄標籤選項列表
            var championTags = new List<SelectListItem>()
            {
                new() { Text = "全部" , Value = string.Empty },
                new() { Text = "刺客" , Value = "Assassin" },
                new() { Text = "戰士" , Value = "Fighter" },
                new() { Text = "法師" , Value = "Mage" },
                new() { Text = "射手" , Value = "Marksman" },
                new() { Text = "支援" , Value = "Support" },
                new() { Text = "坦克" , Value = "Tank" },
            };
            // 將選項列表和搜尋參數設置到 ViewBag
            ViewBag.States = states;
            ViewBag.ChampionTags = championTags;
            ViewBag.Search = search;
            ViewBag.StsteValue = ststeValue;
            // 根據搜尋條件過濾英雄資料
            if (!string.IsNullOrEmpty(search))
                data = data.Where(d => d.Name.Contains(search) || d.Id.Contains(search)).ToList(); // 根據 search 參數過濾英雄資料
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
            // 返回視圖並顯示過濾後的英雄資料
            return View(data);
        }

        // 根據英雄 ID 獲取英雄詳細資料並顯示
        public IActionResult ChampionContent(string Id)
        {
            // 查找對應 ID 的英雄資料
            var champion = dbContext.Champion.Find(Id);
            if (champion == null)
                return BadRequest();// 若找不到英雄資料，返回錯誤請求
            
            // 構造 ChampionData 對象，包含英雄基本資料、信息、技能和狀態
            var data = new ChampionData()
            {
                DTO_Champion = champion,
                DTO_Info = dbContext.Info.FirstOrDefault(d => d.Id == Id) ?? new(),
                DTO_Spells = dbContext.Spell.Where(d => d.Id == Id).ToList() ?? [],
                DTO_States = dbContext.States.FirstOrDefault(d => d.Id == Id) ?? new()
            };

            // 格式化英雄提示資料
            data.DTO_Champion.AllytipList = FormatArray(data.DTO_Champion.Allytips);
            data.DTO_Champion.EnemytipList = FormatArray(data.DTO_Champion.Enemytips);

            // 設置視圖資料
            ViewData["ProjectName"] = "英雄聯盟手冊";
            var newData = new ViewModel()
            {
                第一張圖網址 = $"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{champion.Id}_0.jpg",
                名稱 = champion.Name,
                屬性 = champion.Tags.Replace("[", "").Replace("]", "").Replace("\\", "").Replace("\"", "").Split(','),
            };
            ViewBag.Champion = newData;

            // 檢查是否將英雄加入最愛
            var love = dbContext.Love.ToList();
            ViewData["LoveAction"] = love.Any(d => d.Id == Id) ? "移除最愛" : "加入最愛";
            ViewData["LoveActionURL"] = love.Any(d => d.Id == Id) 
                ? Url.Action("RemoveLove", "LoL", new { Id }) 
                : Url.Action("AddLove", "LoL", new { Id });

            // 返回視圖並顯示英雄詳細資料
            return View(data);
        }

        // 顯示用戶收藏的英雄列表
        public async Task<IActionResult> Love()
        {
            // 獲取用戶收藏的英雄 ID 列表
            var love = dbContext.Love.ToList();
            var source = dbContext.Champion.ToList();
            var source_Info = dbContext.Info.ToList();
            var source_States = dbContext.States.ToList();

            // 將英雄資料轉換為 DTOChampion 對象列表
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
            // 獲取英雄資料
            // 確保英雄資料數量為 152，不足則從 API 獲取
            if (data.Count != 152) await GetChampionDataAsync();
            // 將收藏的英雄資料加入 items 列表
            var items = new List<DTOChampion>();
            foreach (var item in love)
            {
                items.Add(data.First(d => d.Id == item.Id));
            }


            // 返回視圖並顯示收藏的英雄資料
            return View(items);
        }

        // 添加英雄到收藏列表
        public IActionResult AddLove(string Id)
        {
            try
            {
                // 添加英雄到 Love 表並保存更改
                dbContext.Love.Add(new Love() { Id = Id });
                dbContext.SaveChanges();
            }
            catch 
            {
                // 發生錯誤時，重新定向到 Love 頁面
                return RedirectToAction("Love","LoL");
            }
            // 添加成功後，重新定向到 Love 頁面
            return RedirectToAction("Love","LoL");
        }
        // 從收藏列表中移除英雄
        public async Task<IActionResult> RemoveLove(string Id)
        {
            try
            {
                // 查找收藏的英雄資料
                var data = dbContext.Love.FirstOrDefault(d => d.Id == Id);
                if (data is null)
                    return await Love();// 若找不到，返回收藏頁面
                // 移除收藏的英雄資料並保存更改
                dbContext.Love.Remove(data);
                dbContext.SaveChanges();
            }
            catch
            {
                // 發生錯誤時，重新定向到英雄詳細頁面
                return RedirectToAction("ChampionContent", "LoL", new { Id });
            }
            // 移除成功後，重新定向到英雄詳細頁面
            return RedirectToAction("ChampionContent", "LoL", new { Id });
        }

        // 獲取遊戲英雄列表到資料庫
        public async Task GetChampionDataAsync()
        {
            // 使用 HttpClient 從 API 獲取英雄資料
            using HttpClient client = new();
            HttpResponseMessage response = await client.GetAsync($"https://ddragon.leagueoflegends.com/cdn/10.22.1/data/zh_TW/champion.json");
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            // 反序列化 API 返回的 JSON 資料
            var data = JsonConvert.DeserializeObject<JsonData.ChampionData>(responseBody) ?? new();
            data.ChampionList =  data.Data.Values.ToList();
            // 將 API 返回的英雄資料轉換並保存到資料庫
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
            // 將資料批量添加到資料庫
            await dbContext.AddRangeAsync(champions);
            await dbContext.AddRangeAsync(info);
            await dbContext.AddRangeAsync(state);
            await dbContext.SaveChangesAsync();
        }

        // 格式化 JSON 字符串數組
        public string[] FormatArray(string str) => JsonConvert.DeserializeObject<string[]>(str ?? "") ?? [];
    }
}
