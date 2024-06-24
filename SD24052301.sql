-- �Ы� LOLIllustratedBook ��Ʈw
CREATE DATABASE LOLIllustratedBook;
GO

-- �ϥ� LOLIllustratedBook ��Ʈw
USE LOLIllustratedBook;
GO

-- �Ы� Champion ��
CREATE TABLE Champion (
    Id NVARCHAR(50) NOT NULL PRIMARY KEY,  -- �^�����ߤ@�ѧO�šA�D��
    KeyName NVARCHAR(50) NOT NULL,         -- �^������W
    Name NVARCHAR(100) NOT NULL,           -- �^���W��
    Title NVARCHAR(100) NOT NULL,          -- �^���ٸ�
    Lore NVARCHAR(MAX) NOT NULL,           -- �^���I���G��
    Blurb NVARCHAR(MAX) NOT NULL,          -- �^��²��
    Allytips NVARCHAR(MAX) NOT NULL,       -- �P�^���P�}�窺����
    Enemytips NVARCHAR(MAX) NOT NULL,      -- ��ܭ^��������
    Tags NVARCHAR(MAX) NOT NULL,           -- �^������
    Partype NVARCHAR(50) NOT NULL          -- �귽�����]��q�B�k�O���^
);

-- �Ы� Info ��
CREATE TABLE Info (
    Id NVARCHAR(50) NOT NULL PRIMARY KEY,  -- �P Champion �����p���~��
    Attack INT NOT NULL,                   -- �����O
    Defense INT NOT NULL,                  -- ���m�O
    Magic INT NOT NULL,                    -- �]�k�O�q
    Difficulty INT NOT NULL                -- �ާ@����
);

-- �Ы� Stats ��
CREATE TABLE Stats (
    Id NVARCHAR(50) NOT NULL PRIMARY KEY,  -- �P Champion �����p���~��
    Hp FLOAT NOT NULL,                     -- �ͩR��
    Hpperlevel FLOAT NOT NULL,             -- �C�ťͩR�Ȧ���
    Mp FLOAT NOT NULL,                     -- �k�O��
    Mpperlevel FLOAT NOT NULL,             -- �C�Ūk�O�Ȧ���
    Movespeed FLOAT NOT NULL,              -- ���ʳt��
    Armor FLOAT NOT NULL,                  -- �@��
    Armorperlevel FLOAT NOT NULL,          -- �C���@�Ҧ���
    Spellblock FLOAT NOT NULL,             -- �]��
    Spellblockperlevel FLOAT NOT NULL,     -- �C���]�ܦ���
    Attackrange FLOAT NOT NULL,            -- �����Z��
    Hpregen FLOAT NOT NULL,                -- �ͩR�^�_
    Hpregenperlevel FLOAT NOT NULL,        -- �C�ťͩR�^�_����
    Mpregen FLOAT NOT NULL,                -- �k�O�^�_
    Mpregenperlevel FLOAT NOT NULL,        -- �C�Ūk�O�^�_����
    Crit FLOAT NOT NULL,                   -- �����v
    Critperlevel FLOAT NOT NULL,           -- �C�ż����v����
    Attackdamage FLOAT NOT NULL,           -- �����O
    Attackdamageperlevel FLOAT NOT NULL,   -- �C�ŧ����O����
    Attackspeedperlevel FLOAT NOT NULL,    -- �C�ŧ����t�צ���
    Attackspeed FLOAT NOT NULL             -- �����t��
);

-- �Ы� Spell ��
CREATE TABLE Spell (
    Guid UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,  -- �ߤ@�ѧO�šA�D��
    Id NVARCHAR(50) NOT NULL,                   -- �ޯ઺�ߤ@�ѧO��
    ImageId NVARCHAR(50) NOT NULL,              -- �ޯ�Ϥ����ѧO��
    Name NVARCHAR(100) NOT NULL,                -- �ޯ�W��
    Description NVARCHAR(MAX) NOT NULL          -- �ޯ�y�z
);
