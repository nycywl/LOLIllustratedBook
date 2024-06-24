using Microsoft.EntityFrameworkCore; // 引入 Entity Framework Core 命名空間，用於與資料庫進行交互。
using System.ComponentModel.DataAnnotations; // 引入 DataAnnotations 命名空間，用於資料註釋。
using System.ComponentModel.DataAnnotations.Schema; // 引入 DataAnnotations.Schema 命名空間，用於資料表相關註釋。

namespace LOLIllustratedBook.Models // 定義 LOLIllustratedBook.Models 命名空間。
{
    public class Champion // 定義 Champion 類，代表英雄模型。
    {
        [Key] // 指定 Id 屬性為主鍵。
        public string Id { get; set; } = string.Empty; // 定義 Id 屬性，類型為 string，預設值為空字串。
        public string KeyName { get; set; } = string.Empty; // 定義 KeyName 屬性，類型為 string，預設值為空字串。
        public string Name { get; set; } = string.Empty; // 定義 Name 屬性，類型為 string，預設值為空字串。
        public string Title { get; set; } = string.Empty; // 定義 Title 屬性，類型為 string，預設值為空字串。
        public string Lore { get; set; } = string.Empty; // 定義 Lore 屬性，類型為 string，預設值為空字串。
        public string Blurb { get; set; } = string.Empty; // 定義 Blurb 屬性，類型為 string，預設值為空字串。
        public string Allytips { get; set; } = string.Empty; // 定義 Allytips 屬性，類型為 string，預設值為空字串。
        public string Enemytips { get; set; } = string.Empty; // 定義 Enemytips 屬性，類型為 string，預設值為空字串。
        public string Tags { get; set; } = string.Empty; // 定義 Tags 屬性，類型為 string，預設值為空字串。
        public string Partype { get; set; } = string.Empty; // 定義 Partype 屬性，類型為 string，預設值為空字串。

        [NotMapped] // 指示 Entity Framework 不要將這個屬性映射到資料庫。
        public string ImageURL => $"https://ddragon.leagueoflegends.com/cdn/img/champion/splash/{Id}_0.jpg"; // 定義只讀屬性 ImageURL，返回組合的圖片 URL。
        [NotMapped] // 指示 Entity Framework 不要將這個屬性映射到資料庫。
        public string[] AllytipList { get; set; } = []; // 定義 AllytipList 屬性，類型為 string 陣列，預設為空陣列。
        [NotMapped] // 指示 Entity Framework 不要將這個屬性映射到資料庫。
        public string[] EnemytipList { get; set; } = []; // 定義 EnemytipList 屬性，類型為 string 陣列，預設為空陣列。
    }

    public class Info // 定義 Info 類，代表英雄資訊模型。
    {
        [Key] // 指定 Id 屬性為主鍵。
        public string Id { get; set; } = string.Empty; // 定義 Id 屬性，類型為 string，預設值為空字串。
        public int Attack { get; set; } // 定義 Attack 屬性，類型為 int。
        public int Defense { get; set; } // 定義 Defense 屬性，類型為 int。
        public int Magic { get; set; } // 定義 Magic 屬性，類型為 int。
        public int Difficulty { get; set; } // 定義 Difficulty 屬性，類型為 int。
    }

    public class States // 定義 States 類，代表英雄狀態模型。
    {
        [Key] // 指定 Id 屬性為主鍵。
        public string Id { get; set; } = string.Empty; // 定義 Id 屬性，類型為 string，預設值為空字串。
        public double Hp { get; set; } // 定義 Hp 屬性，類型為 double。
        public double Hpperlevel { get; set; } // 定義 Hpperlevel 屬性，類型為 double。
        public double Mp { get; set; } // 定義 Mp 屬性，類型為 double。
        public double Mpperlevel { get; set; } // 定義 Mpperlevel 屬性，類型為 double。
        public double Movespeed { get; set; } // 定義 Movespeed 屬性，類型為 double。
        public double Armor { get; set; } // 定義 Armor 屬性，類型為 double。
        public double Armorperlevel { get; set; } // 定義 Armorperlevel 屬性，類型為 double。
        public double Spellblock { get; set; } // 定義 Spellblock 屬性，類型為 double。
        public double Spellblockperlevel { get; set; } // 定義 Spellblockperlevel 屬性，類型為 double。
        public double Attackrange { get; set; } // 定義 Attackrange 屬性，類型為 double。
        public double Hpregen { get; set; } // 定義 Hpregen 屬性，類型為 double。
        public double Hpregenperlevel { get; set; } // 定義 Hpregenperlevel 屬性，類型為 double。
        public double Mpregen { get; set; } // 定義 Mpregen 屬性，類型為 double。
        public double Mpregenperlevel { get; set; } // 定義 Mpregenperlevel 屬性，類型為 double。
        public double Crit { get; set; } // 定義 Crit 屬性，類型為 double。
        public double Critperlevel { get; set; } // 定義 Critperlevel 屬性，類型為 double。
        public double Attackdamage { get; set; } // 定義 Attackdamage 屬性，類型為 double。
        public double Attackdamageperlevel { get; set; } // 定義 Attackdamageperlevel 屬性，類型為 double。
        public double Attackspeedperlevel { get; set; } // 定義 Attackspeedperlevel 屬性，類型為 double。
        public double Attackspeed { get; set; } // 定義 Attackspeed 屬性，類型為 double。
    }

    public class Spell // 定義 Spell 類，代表英雄技能模型。
    {
        [Key] // 指定 Guid 屬性為主鍵。
        public Guid Guid { get; set; } // 定義 Guid 屬性，類型為 Guid。
        public string Id { get; set; } = string.Empty; // 定義 Id 屬性，類型為 string，預設值為空字串。
        public string ImageId { get; set; } = string.Empty; // 定義 ImageId 屬性，類型為 string，預設值為空字串。
        public string Name { get; set; } = string.Empty; // 定義 Name 屬性，類型為 string，預設值為空字串。
        public string Description { get; set; } = string.Empty; // 定義 Description 屬性，類型為 string，預設值為空字串。
    }

    public class Love // 定義 Love 類，代表最愛模型。
    {
        [Key] // 指定 Id 屬性為主鍵。
        public string Id { get; set; } = string.Empty; // 定義 Id 屬性，類型為 string，預設值為空字串。
    }

    public class LOLIllustratedBook_DbContext : DbContext // 定義 LOLIllustratedBook_DbContext 類，繼承自 DbContext，代表資料庫上下文。
    {
        private readonly static string commonSource = "juroserver.com"; // 定義常數 commonSource，資料庫來源。
        private readonly static string commonUserId = "SD24052301"; // 定義常數 commonUserId，資料庫用戶 ID。
        private readonly static string commonPassword = "SD24052301"; // 定義常數 commonPassword，資料庫用戶密碼。
        private readonly static string database = "LOLIllustratedBook"; // 定義常數 database，資料庫名稱。

        private static string GetConnectionString() // 定義 GetConnectionString 方法，用於生成資料庫連接字串。
        {
            return $"Data Source={commonSource};Persist Security Info=True;" +
                   $"User ID={commonUserId};" +
                   $"Password={commonPassword};" +
                   $"TrustServerCertificate=true;" +
                   $"Database={database}"; // 返回組合的資料庫連接字串。
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) // 重寫 OnConfiguring 方法，用於配置資料庫選項。
        {
            optionsBuilder.UseSqlServer(GetConnectionString()); // 設定資料庫連接字串使用 SQL Server。
        }

        public LOLIllustratedBook_DbContext(DbContextOptions<LOLIllustratedBook_DbContext> options) // 定義 LOLIllustratedBook_DbContext 構造函數，接受 DbContextOptions 參數。
            : base(options) // 調用基類構造函數。
        {
        }

        public DbSet<Champion> Champion { get; set; } // 定義 Champion 資料集，類型為 DbSet<Champion>。
        public DbSet<Info> Info { get; set; } // 定義 Info 資料集，類型為 DbSet<Info>。
        public DbSet<States> States { get; set; } // 定義 States 資料集，類型為 DbSet<States>。
        public DbSet<Spell> Spell { get; set; } // 定義 Spell 資料集，類型為 DbSet<Spell>。
        public DbSet<Love> Love { get; set; } // 定義 Love 資料集，類型為 DbSet<Love>。
    }
}
