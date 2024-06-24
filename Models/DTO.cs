namespace LOLIllustratedBook.Models
{
    // 定義 ChampionData 類別，代表英雄資料 DTO。
    public class ChampionData
    {
        // 定義 DTO_Champion 屬性，類型為 Champion，並初始化為新的 Champion 物件。
        public Champion DTO_Champion { get; set; } = new();

        // 定義 DTO_Info 屬性，類型為 Info，並初始化為新的 Info 物件。
        public Info DTO_Info { get; set; } = new();

        // 定義 DTO_States 屬性，類型為 States，並初始化為新的 States 物件。
        public States DTO_States { get; set; } = new();

        // 定義 DTO_Spells 屬性，類型為 List<Spell>，並初始化為空列表。
        public List<Spell> DTO_Spells { get; set; } = new List<Spell>();

        // 定義 ImageURL 屬性，類型為 string，使用 lambda 表達式定義只讀屬性。
        // 返回組合的英雄大頭像 URL。
        public string ImageURL => $"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{DTO_Champion.Id}_0.jpg";

        // 定義 LoadingImage 屬性，類型為 string，使用 lambda 表達式定義只讀屬性。
        // 返回組合的英雄載入畫面 URL。
        public string LoadingImage => $"https://ddragon.leagueoflegends.com/cdn/img/champion/loading/{DTO_Champion.Id}_0.jpg";
    }

    // 定義 DTOChampion 類別，代表簡化的英雄資料 DTO。
    public class DTOChampion
    {
        // 定義 Id 屬性，類型為 string，預設值為空字串。
        public string Id { get; set; } = string.Empty;

        // 定義 Name 屬性，類型為 string，預設值為空字串。
        public string Name { get; set; } = string.Empty;

        // 定義 Title 屬性，類型為 string，預設值為空字串。
        public string Title { get; set; } = string.Empty;

        // 定義 Blurb 屬性，類型為 string，預設值為空字串。
        public string Blurb { get; set; } = string.Empty;

        // 定義 Tags 屬性，類型為 string，預設值為空字串。
        public string Tags { get; set; } = string.Empty;

        // 定義 Partype 屬性，類型為 string，預設值為空字串。
        public string Partype { get; set; } = string.Empty;

        // 定義 Attack 屬性，類型為 int。
        public int Attack { get; set; }

        // 定義 Defense 屬性，類型為 int。
        public int Defense { get; set; }

        // 定義 Magic 屬性，類型為 int。
        public int Magic { get; set; }

        // 定義 Difficulty 屬性，類型為 int。
        public int Difficulty { get; set; }

        // 定義 Hp 屬性，類型為 double。
        public double Hp { get; set; }

        // 定義 Hpperlevel 屬性，類型為 double。
        public double Hpperlevel { get; set; }

        // 定義 Mp 屬性，類型為 double。
        public double Mp { get; set; }

        // 定義 Mpperlevel 屬性，類型為 double。
        public double Mpperlevel { get; set; }

        // 定義 Movespeed 屬性，類型為 double。
        public double Movespeed { get; set; }

        // 定義 Armor 屬性，類型為 double。
        public double Armor { get; set; }

        // 定義 Armorperlevel 屬性，類型為 double。
        public double Armorperlevel { get; set; }

        // 定義 Spellblock 屬性，類型為 double。
        public double Spellblock { get; set; }

        // 定義 Spellblockperlevel 屬性，類型為 double。
        public double Spellblockperlevel { get; set; }

        // 定義 Attackrange 屬性，類型為 double。
        public double Attackrange { get; set; }

        // 定義 Hpregen 屬性，類型為 double。
        public double Hpregen { get; set; }

        // 定義 Hpregenperlevel 屬性，類型為 double。
        public double Hpregenperlevel { get; set; }

        // 定義 Mpregen 屬性，類型為 double。
        public double Mpregen { get; set; }

        // 定義 Mpregenperlevel 屬性，類型為 double。
        public double Mpregenperlevel { get; set; }

        // 定義 Crit 屬性，類型為 double。
        public double Crit { get; set; }

        // 定義 Critperlevel 屬性，類型為 double。
        public double Critperlevel { get; set; }

        // 定義 Attackdamage 屬性，類型為 double。
        public double Attackdamage { get; set; }

        // 定義 Attackdamageperlevel 屬性，類型為 double。
        public double Attackdamageperlevel { get; set; }

        // 定義 Attackspeedperlevel 屬性，類型為 double。
        public double Attackspeedperlevel { get; set; }

        // 定義 Attackspeed 屬性，類型為 double。
        public double Attackspeed { get; set; }

        // 定義 ImageURL 屬性，類型為 string，預設值為空字串。
        public string ImageURL { get; set; } = string.Empty;
    }
}
