using Microsoft.CodeAnalysis.Recommendations;

namespace LOLIllustratedBook.Models
{
    // 定義 JsonData 命名空間，包含多個與 JSON 數據結構相關的類別。
    public class JsonData
    {
        // 定義 ChampionData 類別，代表英雄數據。
        public class ChampionData
        {
            public string Type { get; set; } = string.Empty;  // 定義類型屬性，用於指定數據類型。
            public string Format { get; set; } = string.Empty;  // 定義格式屬性，用於指定數據格式。
            public string Version { get; set; } = string.Empty;  // 定義版本屬性，用於指定數據版本。
            public Dictionary<string, Champion> Data { get; set; } = new();  // 定義字典屬性 Data，存儲多個 Champion 類別的數據。
            public List<Champion> ChampionList { get; set; } = new();  // 定義列表屬性 ChampionList，存儲多個 Champion 類別的列表。
        }

        // 定義 Champion 類別，代表英雄數據的詳細信息。
        public class Champion
        {
            public string Id { get; set; } = string.Empty;  // 定義 Id 屬性，表示英雄的唯一標識符。
            public string Key { get; set; } = string.Empty;  // 定義 Key 屬性，表示英雄的關鍵名稱。
            public string Name { get; set; } = string.Empty;  // 定義 Name 屬性，表示英雄的名稱。
            public string Title { get; set; } = string.Empty;  // 定義 Title 屬性，表示英雄的稱號。
            public Image Image { get; set; } = new();  // 定義 Image 屬性，存儲英雄的圖片信息。
            public List<Skin> Skins { get; set; } = new();  // 定義 Skins 屬性，存儲英雄的不同皮膚信息。
            public string Lore { get; set; } = string.Empty;  // 定義 Lore 屬性，表示英雄的背景故事。
            public string Blurb { get; set; } = string.Empty;  // 定義 Blurb 屬性，表示英雄的簡介。
            public List<string> Allytips { get; set; } = new();  // 定義 Allytips 屬性，存儲與友方英雄互動的提示。
            public List<string> Enemytips { get; set; } = new();  // 定義 Enemytips 屬性，存儲與敵方英雄互動的提示。
            public List<string> Tags { get; set; } = new();  // 定義 Tags 屬性，存儲英雄的標籤。
            public string Partype { get; set; } = string.Empty;  // 定義 Partype 屬性，表示英雄的能量類型。
            public Info Info { get; set; } = new();  // 定義 Info 屬性，存儲英雄的基本屬性信息。
            public Stats Stats { get; set; } = new();  // 定義 Stats 屬性，存儲英雄的數值屬性信息。
            public List<Spell> Spells { get; set; } = new();  // 定義 Spells 屬性，存儲英雄的技能列表。
            public Passive Passive { get; set; } = new();  // 定義 Passive 屬性，存儲英雄的被動技能信息。
            public List<Recommended> Recommended { get; set; } = new();  // 定義 Recommended 屬性，存儲建議的出裝建議。
            public string ImageURL => $"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{Id}_0.jpg";  // 計算屬性，返回英雄的大頭圖片 URL。
            public string LoadingImage => $"https://ddragon.leagueoflegends.com/cdn/img/champion/loading/{Id}_0.jpg";  // 計算屬性，返回英雄的載入圖片 URL。
        }

        // 定義 Image 類別，表示圖片的詳細信息。
        public class Image
        {
            public string? Full { get; set; }  // 定義 Full 屬性，表示完整的圖片名稱。
            public string? Sprite { get; set; }  // 定義 Sprite 屬性，表示精靈圖片的名稱。
            public string? Group { get; set; }  // 定義 Group 屬性，表示圖片的分組名稱。
            public int X { get; set; }  // 定義 X 屬性，表示圖片在精靈圖中的 X 軸位置。
            public int Y { get; set; }  // 定義 Y 屬性，表示圖片在精靈圖中的 Y 軸位置。
            public int W { get; set; }  // 定義 W 屬性，表示圖片的寬度。
            public int H { get; set; }  // 定義 H 屬性，表示圖片的高度。
        }

        // 定義 Skin 類別，表示英雄的不同皮膚信息。
        public class Skin
        {
            public string Id { get; set; } = string.Empty;  // 定義 Id 屬性，表示皮膚的唯一標識符。
            public int Num { get; set; }  // 定義 Num 屬性，表示皮膚的編號。
            public string Name { get; set; } = string.Empty;  // 定義 Name 屬性，表示皮膚的名稱。
            public bool Chromas { get; set; }  // 定義 Chromas 屬性，表示皮膚是否有染色版本。
        }

        // 定義 Info 類別，表示英雄的基本屬性信息。
        public class Info
        {
            public int Attack { get; set; }  // 定義 Attack 屬性，表示英雄的攻擊力。
            public int Defense { get; set; }  // 定義 Defense 屬性，表示英雄的防禦力。
            public int Magic { get; set; }  // 定義 Magic 屬性，表示英雄的魔法力。
            public int Difficulty { get; set; }  // 定義 Difficulty 屬性，表示英雄的難度。
        }

        // 定義 Stats 類別，表示英雄的數值屬性信息。
        public class Stats
        {
            public double Hp { get; set; }  // 定義 Hp 屬性，表示英雄的生命值。
            public double Hpperlevel { get; set; }  // 定義 Hpperlevel 屬性，表示英雄每級的生命成長值。
            public double Mp { get; set; }  // 定義 Mp 屬性，表示英雄的法力值。
            public double Mpperlevel { get; set; }  // 定義 Mpperlevel 屬性，表示英雄每級的法力成長值。
            public double Movespeed { get; set; }  // 定義 Movespeed 屬性，表示英雄的移動速度。
            public double Armor { get; set; }  // 定義 Armor 屬性，表示英雄的護甲值。
            public double Armorperlevel { get; set; }  // 定義 Armorperlevel 屬性，表示英雄每級的護甲成長值。
            public double Spellblock { get; set; }  // 定義 Spellblock 屬性，表示英雄的魔法抗性。
            public double Spellblockperlevel { get; set; }  // 定義 Spellblockperlevel 屬性，表示英雄每級的魔法抗性成長值。
            public double Attackrange { get; set; }  // 定義 Attackrange 屬性，表示英雄的攻擊範圍。
            public double Hpregen { get; set; }  // 定義 Hpregen 屬性，表示英雄的生命回復。
            public double Hpregenperlevel { get; set; }  // 定義 Hpregenperlevel 屬性，表示英雄每級的生命回復成長值。
            public double Mpregen { get; set; }  // 定義 Mpregen 屬性，表示英雄的法力回復。
            public double Mpregenperlevel { get; set; }  // 定義 Mpregenperlevel 屬性，表示英雄每級的法力回復成長值。
            public double Crit { get; set; }  // 定義 Crit 屬性，表示英雄的暴擊率。
            public double Critperlevel { get; set; }  // 定義 Critperlevel 屬性，表示英雄每級的暴擊率成長值。
            public double Attackdamage { get; set; }  // 定義 Attackdamage 屬性，表示英雄的攻擊力。
            public double Attackdamageperlevel { get; set; }  // 定義 Attackdamageperlevel 屬性，表示英雄每級的攻擊力成長值。
            public double Attackspeedperlevel { get; set; }  // 定義 Attackspeedperlevel 屬性，表示英雄每級的攻擊速度成長值。
            public double Attackspeed { get; set; }  // 定義 Attackspeed 屬性，表示英雄的攻擊速度。

            // Stats 類別用於存儲英雄的各種數值屬性，每個屬性對應於英雄的不同數值或成長值。
        }

        // 定義 Spell 類別，表示英雄的技能信息。
        public class Spell
        {
            public string Id { get; set; } = string.Empty;  // 定義 Id 屬性，表示技能的唯一標識符。
            public string Name { get; set; } = string.Empty;  // 定義 Name 屬性，表示技能的名稱。
            public string Description { get; set; } = string.Empty;  // 定義 Description 屬性，表示技能的描述信息。
            public string Tooltip { get; set; } = string.Empty;  // 定義 Tooltip 屬性，表示技能的提示信息。
            public Leveltip Leveltip { get; set; } = new();  // 定義 Leveltip 屬性，表示技能的等級提示信息。
            public int Maxrank { get; set; }  // 定義 Maxrank 屬性，表示技能的最大等級。
            public List<double> Cooldown { get; set; } = new();  // 定義 Cooldown 屬性，存儲技能的冷卻時間。
            public string CooldownBurn { get; set; } = string.Empty;  // 定義 CooldownBurn 屬性，表示技能冷卻時間的描述。
            public List<double> Cost { get; set; } = new();  // 定義 Cost 屬性，存儲技能的消耗。
            public string CostBurn { get; set; } = string.Empty;  // 定義 CostBurn 屬性，表示技能消耗的描述。
            public Datavalues Datavalues { get; set; } = new();  // 定義 Datavalues 屬性，存儲技能的數據值。
            public List<List<double>> Effect { get; set; } = new();  // 定義 Effect 屬性，存儲技能的效果值。
            public List<string> EffectBurn { get; set; } = new();  // 定義 EffectBurn 屬性，存儲技能效果的描述。
            public List<Var> Vars { get; set; } = new();  // 定義 Vars 屬性，存儲技能的變量信息。
            public string CostType { get; set; } = string.Empty;  // 定義 CostType 屬性，表示技能消耗的類型。
            public int Maxammo { get; set; }  // 定義 Maxammo 屬性，表示技能的最大彈藥數量。
            public List<double> Range { get; set; } = new();  // 定義 Range 屬性，存儲技能的射程。
            public string RangeBurn { get; set; } = string.Empty;  // 定義 RangeBurn 屬性，表示技能射程的描述。
            public Image Image { get; set; } = new();  // 定義 Image 屬性，存儲技能的圖片信息。
            public string Resource { get; set; } = string.Empty;  // 定義 Resource 屬性，表示技能的資源消耗。
            public string SkillImageURL => $"{Id}.png";  // 計算屬性，返回技能的圖片 URL。
        }

        // 定義 Leveltip 類別，表示技能的等級提示信息。
        public class Leveltip
        {
            public List<string> Label { get; set; } = new();  // 定義 Label 屬性，存儲等級提示的標籤。
            public List<string> Effect { get; set; } = new();  // 定義 Effect 屬性，存儲等級提示的效果描述。
        }

        // 定義 Datavalues 類別，存儲技能的數據值。
        public class Datavalues
        {
            // 此類別暫無任何屬性定義。
        }

        // 定義 Var 類別，存儲技能的變量信息。
        public class Var
        {
            // 此類別暫無任何屬性定義。
        }

        // 定義 Passive 類別，表示英雄的被動技能信息。
        public class Passive
        {
            public string Name { get; set; } = string.Empty;  // 定義 Name 屬性，表示被動技能的名稱。
            public string Description { get; set; } = string.Empty;  // 定義 Description 屬性，表示被動技能的描述信息。
            public Image Image { get; set; } = new();  // 定義 Image 屬性，存儲被動技能的圖片信息。
        }

        // 定義 Recommended 類別，表示英雄的出裝建議。
        public class Recommended
        {
            public string Champion { get; set; } = string.Empty;  // 定義 Champion 屬性，表示出裝建議的英雄名稱。
            public string Title { get; set; } = string.Empty;  // 定義 Title 屬性，表示出裝建議的標題。
            public string Map { get; set; } = string.Empty;  // 定義 Map 屬性，表示出裝建議的地圖。
            public string Mode { get; set; } = string.Empty;  // 定義 Mode 屬性，表示出裝建議的遊戲模式。
            public string Type { get; set; } = string.Empty;  // 定義 Type 屬性，表示出裝建議的類型。
            public string CustomTag { get; set; } = string.Empty;  // 定義 CustomTag 屬性，表示出裝建議的自定義標籤。
            public int Sortrank { get; set; }  // 定義 Sortrank 屬性，表示出裝建議的排序權重。
            public bool ExtensionPage { get; set; }  // 定義 ExtensionPage 屬性，表示是否為擴展頁面。
            public bool UseObviousCheckmark { get; set; }  // 定義 UseObviousCheckmark 屬性，表示是否使用明顯的勾選標記。
            public object CustomPanel { get; set; } = new();  // 定義 CustomPanel 屬性，存儲出裝建議的自定義面板信息。
            public List<Block> Blocks { get; set; } = new();  // 定義 Blocks 屬性，存儲出裝建議的具體建議區塊。
        }

        // 定義 Block 類別，表示出裝建議的具體建議區塊。
        public class Block
        {
            public string Type { get; set; } = string.Empty;  // 定義 Type 屬性，表示建議區塊的類型。
            public bool RecMath { get; set; }  // 定義 RecMath 屬性，表示是否根據數學計算。
            public bool RecSteps { get; set; }  // 定義 RecSteps 屬性，表示是否使用步驟計算。
            public int MinSummonerLevel { get; set; }  // 定義 MinSummonerLevel 屬性，表示建議的最小召喚師等級。
            public int MaxSummonerLevel { get; set; }  // 定義 MaxSummonerLevel 屬性，表示建議的最大召喚師等級。
            public string ShowIfSummonerSpell { get; set; } = string.Empty;  // 定義 ShowIfSummonerSpell 屬性，表示召喚師技能顯示條件。
            public string HideIfSummonerSpell { get; set; } = string.Empty;  // 定義 HideIfSummonerSpell 屬性，表示召喚師技能隱藏條件。
            public string AppendAfterSection { get; set; } = string.Empty;  // 定義 AppendAfterSection 屬性，表示建議區塊在哪個章節後追加。
            public List<string> VisibleWithAllOf { get; set; } = new();  // 定義 VisibleWithAllOf 屬性，存儲顯示條件的所有必要條件。
            public List<string> HiddenWithAnyOf { get; set; } = new();  // 定義 HiddenWithAnyOf 屬性，存儲隱藏條件的任何一個條件即可隱藏。
            public List<Item> Items { get; set; } = new();  // 定義 Items 屬性，存儲建議的具體物品。
        }

        // 定義 Item 類別，表示出裝建議的具體物品。
        public class Item
        {
            public string Id { get; set; } = string.Empty;  // 定義 Id 屬性，表示物品的唯一標識符。
            public int Count { get; set; }  // 定義 Count 屬性，表示物品的數量。
            public bool HideCount { get; set; }  // 定義 HideCount 屬性，表示是否隱藏物品數量。
        }
    }
}
