-- �Ы� LOLIllustratedBook ��Ʈw
CREATE DATABASE LOLIllustratedBook;
GO

-- �ϥ� LOLIllustratedBook ��Ʈw
USE LOLIllustratedBook;
GO

-- �Ы� Champion ��
CREATE TABLE Champion (
    Id NVARCHAR(50) NOT NULL PRIMARY KEY,
    KeyName NVARCHAR(50) NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    Title NVARCHAR(100) NOT NULL,
    Lore NVARCHAR(MAX) NOT NULL,
    Blurb NVARCHAR(MAX) NOT NULL,
    Allytips NVARCHAR(MAX) NOT NULL,
    Enemytips NVARCHAR(MAX) NOT NULL,
    Tags NVARCHAR(MAX) NOT NULL,
    Partype NVARCHAR(50) NOT NULL
);

-- �Ы� Info ��
CREATE TABLE Info (
    Id NVARCHAR(50) NOT NULL PRIMARY KEY,
    Attack INT NOT NULL,
    Defense INT NOT NULL,
    Magic INT NOT NULL,
    Difficulty INT NOT NULL
);

-- �Ы� Stats ��
CREATE TABLE States (
    Id NVARCHAR(50) NOT NULL PRIMARY KEY,
    Hp FLOAT NOT NULL,
    Hpperlevel FLOAT NOT NULL,
    Mp FLOAT NOT NULL,
    Mpperlevel FLOAT NOT NULL,
    Movespeed FLOAT NOT NULL,
    Armor FLOAT NOT NULL,
    Armorperlevel FLOAT NOT NULL,
    Spellblock FLOAT NOT NULL,
    Spellblockperlevel FLOAT NOT NULL,
    Attackrange FLOAT NOT NULL,
    Hpregen FLOAT NOT NULL,
    Hpregenperlevel FLOAT NOT NULL,
    Mpregen FLOAT NOT NULL,
    Mpregenperlevel FLOAT NOT NULL,
    Crit FLOAT NOT NULL,
    Critperlevel FLOAT NOT NULL,
    Attackdamage FLOAT NOT NULL,
    Attackdamageperlevel FLOAT NOT NULL,
    Attackspeedperlevel FLOAT NOT NULL,
    Attackspeed FLOAT NOT NULL
);

-- �Ы� Spell ��
CREATE TABLE Spell (
    Guid UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
    Id NVARCHAR(50) NOT NULL,
    ImageId NVARCHAR(50) NOT NULL,
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL
);