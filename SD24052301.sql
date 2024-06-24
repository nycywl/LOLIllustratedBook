-- 創建 LOLIllustratedBook 資料庫
CREATE DATABASE LOLIllustratedBook;
GO

-- 使用 LOLIllustratedBook 資料庫
USE LOLIllustratedBook;
GO

-- 創建 Champion 表
CREATE TABLE Champion (
    Id NVARCHAR(50) NOT NULL PRIMARY KEY,  -- 英雄的唯一識別符，主鍵
    KeyName NVARCHAR(50) NOT NULL,         -- 英雄的鍵名
    Name NVARCHAR(100) NOT NULL,           -- 英雄名稱
    Title NVARCHAR(100) NOT NULL,          -- 英雄稱號
    Lore NVARCHAR(MAX) NOT NULL,           -- 英雄背景故事
    Blurb NVARCHAR(MAX) NOT NULL,          -- 英雄簡介
    Allytips NVARCHAR(MAX) NOT NULL,       -- 與英雄同陣營的提示
    Enemytips NVARCHAR(MAX) NOT NULL,      -- 對抗英雄的提示
    Tags NVARCHAR(MAX) NOT NULL,           -- 英雄標籤
    Partype NVARCHAR(50) NOT NULL          -- 資源類型（能量、法力等）
);

-- 創建 Info 表
CREATE TABLE Info (
    Id NVARCHAR(50) NOT NULL PRIMARY KEY,  -- 與 Champion 表關聯的外鍵
    Attack INT NOT NULL,                   -- 攻擊力
    Defense INT NOT NULL,                  -- 防禦力
    Magic INT NOT NULL,                    -- 魔法力量
    Difficulty INT NOT NULL                -- 操作難度
);

-- 創建 Stats 表
CREATE TABLE Stats (
    Id NVARCHAR(50) NOT NULL PRIMARY KEY,  -- 與 Champion 表關聯的外鍵
    Hp FLOAT NOT NULL,                     -- 生命值
    Hpperlevel FLOAT NOT NULL,             -- 每級生命值成長
    Mp FLOAT NOT NULL,                     -- 法力值
    Mpperlevel FLOAT NOT NULL,             -- 每級法力值成長
    Movespeed FLOAT NOT NULL,              -- 移動速度
    Armor FLOAT NOT NULL,                  -- 護甲
    Armorperlevel FLOAT NOT NULL,          -- 每級護甲成長
    Spellblock FLOAT NOT NULL,             -- 魔抗
    Spellblockperlevel FLOAT NOT NULL,     -- 每級魔抗成長
    Attackrange FLOAT NOT NULL,            -- 攻擊距離
    Hpregen FLOAT NOT NULL,                -- 生命回復
    Hpregenperlevel FLOAT NOT NULL,        -- 每級生命回復成長
    Mpregen FLOAT NOT NULL,                -- 法力回復
    Mpregenperlevel FLOAT NOT NULL,        -- 每級法力回復成長
    Crit FLOAT NOT NULL,                   -- 暴擊率
    Critperlevel FLOAT NOT NULL,           -- 每級暴擊率成長
    Attackdamage FLOAT NOT NULL,           -- 攻擊力
    Attackdamageperlevel FLOAT NOT NULL,   -- 每級攻擊力成長
    Attackspeedperlevel FLOAT NOT NULL,    -- 每級攻擊速度成長
    Attackspeed FLOAT NOT NULL             -- 攻擊速度
);

-- 創建 Spell 表
CREATE TABLE Spell (
    Guid UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,  -- 唯一識別符，主鍵
    Id NVARCHAR(50) NOT NULL,                   -- 技能的唯一識別符
    ImageId NVARCHAR(50) NOT NULL,              -- 技能圖片的識別符
    Name NVARCHAR(100) NOT NULL,                -- 技能名稱
    Description NVARCHAR(MAX) NOT NULL          -- 技能描述
);
