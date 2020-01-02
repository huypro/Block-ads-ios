.class public Landroidx/multidex/Hook;
.super Ljava/lang/Object;


# static fields
.field private static a:Landroid/content/SharedPreferences;

.field private static ︁:Ljava/io/File;


# direct methods
.method static constructor <clinit>()V
    .registers 1

    const/4 v0, 0x0

    const/4 v0, 0x0

    sput-object v0, Landroidx/multidex/Hook;->︁:Ljava/io/File;

    sput-object v0, Landroidx/multidex/Hook;->︁:Ljava/io/File;

    return-void
.end method

.method public constructor <init>()V
    .registers 1

    invoke-direct {p0}, Ljava/lang/Object;-><init>()V

    return-void
.end method

.method public static final init(Landroid/content/Context;)V
    .registers 9

    const/4 v6, 0x5

    const/4 v6, 0x5

    const/4 v2, 0x0

    const/4 v2, 0x0

    invoke-static {p0}, Landroid/preference/PreferenceManager;->getDefaultSharedPreferences(Landroid/content/Context;)Landroid/content/SharedPreferences;

    move-result-object v0

    sput-object v0, Landroidx/multidex/Hook;->a:Landroid/content/SharedPreferences;

    sput-object v0, Landroidx/multidex/Hook;->a:Landroid/content/SharedPreferences;

    invoke-virtual {p0}, Landroid/content/Context;->getFilesDir()Ljava/io/File;

    move-result-object v0

    invoke-static {v0}, Landroidx/multidex/Hook;->　(Ljava/io/File;)V

    :try_start_13
    invoke-virtual {p0}, Landroid/content/Context;->getAssets()Landroid/content/res/AssetManager;

    move-result-object v0

    const/4 v1, 0x4

    const/4 v1, 0x4

    new-array v1, v1, [B

    fill-array-data v1, :array_ca

    const-string v3, "fb9177"

    const-string v3, "fb9177"

    const-wide v4, 0x41b81eba37000000L    # 4.04666935E8

    invoke-static {v1, v3, v4, v5}, Landroidx/multidex/StringCrypt;->decode([BLjava/lang/String;D)Ljava/lang/String;

    move-result-object v1

    invoke-virtual {v0, v1}, Landroid/content/res/AssetManager;->open(Ljava/lang/String;)Ljava/io/InputStream;
    :try_end_2e
    .catch Ljava/lang/Exception; {:try_start_13 .. :try_end_2e} :catch_33

    move-result-object v0

    move-object v1, v0

    :goto_30
    if-nez v1, :cond_36

    :cond_32
    :goto_32
    return-void

    :catch_33
    move-exception v0

    move-object v1, v2

    goto :goto_30

    :cond_36
    sget-object v0, Landroidx/multidex/Hook;->a:Landroid/content/SharedPreferences;

    new-array v3, v6, [B

    fill-array-data v3, :array_d0

    const-string v4, "436531"

    const-string v4, "436531"

    const/16 v5, -0x1787

    const/16 v5, -0x1787

    invoke-static {v3, v4, v5}, Landroidx/multidex/StringCrypt;->decode([BLjava/lang/String;I)Ljava/lang/String;

    move-result-object v3

    new-array v4, v6, [B

    fill-array-data v4, :array_d8

    const-string v5, "77c2aa"

    const-string v5, "77c2aa"

    const-wide/32 v6, 0x2eac8cb3

    invoke-static {v4, v5, v6, v7}, Landroidx/multidex/StringCrypt;->decode([BLjava/lang/String;J)Ljava/lang/String;

    move-result-object v4

    invoke-interface {v0, v3, v4}, Landroid/content/SharedPreferences;->getString(Ljava/lang/String;Ljava/lang/String;)Ljava/lang/String;

    move-result-object v0

    sget-object v3, Landroidx/multidex/Hook;->︁:Ljava/io/File;

    invoke-static {v3}, Landroidx/multidex/Hook;->︁(Ljava/io/File;)Ljava/lang/String;

    move-result-object v3

    invoke-virtual {v0, v3}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v0

    if-nez v0, :cond_32

    sget-object v3, Landroidx/multidex/Hook;->︁:Ljava/io/File;

    :try_start_6b
    new-instance v0, Ljava/io/BufferedInputStream;

    invoke-direct {v0, v1}, Ljava/io/BufferedInputStream;-><init>(Ljava/io/InputStream;)V
    :try_end_70
    .catch Ljava/lang/Exception; {:try_start_6b .. :try_end_70} :catch_9c

    :try_start_70
    new-instance v1, Ljava/io/BufferedOutputStream;

    new-instance v4, Ljava/io/FileOutputStream;

    invoke-direct {v4, v3}, Ljava/io/FileOutputStream;-><init>(Ljava/io/File;)V

    invoke-direct {v1, v4}, Ljava/io/BufferedOutputStream;-><init>(Ljava/io/OutputStream;)V
    :try_end_7a
    .catch Ljava/lang/Exception; {:try_start_70 .. :try_end_7a} :catch_c8

    :goto_7a
    const/16 v2, 0x1400

    const/16 v2, 0x1400

    new-array v2, v2, [B

    :goto_80
    :try_start_80
    invoke-virtual {v0, v2}, Ljava/io/BufferedInputStream;->read([B)I

    move-result v4

    const/4 v5, -0x1

    const/4 v5, -0x1

    if-eq v4, v5, :cond_a0

    const/4 v5, 0x0

    const/4 v5, 0x0

    invoke-virtual {v1, v2, v5, v4}, Ljava/io/BufferedOutputStream;->write([BII)V
    :try_end_8d
    .catch Ljava/lang/Exception; {:try_start_80 .. :try_end_8d} :catch_8e

    goto :goto_80

    :catch_8e
    move-exception v2

    :goto_8f
    if-eqz v0, :cond_94

    :try_start_91
    invoke-virtual {v0}, Ljava/io/BufferedInputStream;->close()V
    :try_end_94
    .catch Ljava/io/IOException; {:try_start_91 .. :try_end_94} :catch_c6

    :cond_94
    :goto_94
    if-eqz v1, :cond_32

    :try_start_96
    invoke-virtual {v1}, Ljava/io/BufferedOutputStream;->close()V
    :try_end_99
    .catch Ljava/io/IOException; {:try_start_96 .. :try_end_99} :catch_9a

    goto :goto_32

    :catch_9a
    move-exception v0

    goto :goto_32

    :catch_9c
    move-exception v0

    move-object v0, v2

    :goto_9e
    move-object v1, v2

    goto :goto_7a

    :cond_a0
    :try_start_a0
    sget-object v2, Landroidx/multidex/Hook;->a:Landroid/content/SharedPreferences;

    invoke-interface {v2}, Landroid/content/SharedPreferences;->edit()Landroid/content/SharedPreferences$Editor;

    move-result-object v2

    const/4 v4, 0x5

    const/4 v4, 0x5

    new-array v4, v4, [B

    fill-array-data v4, :array_e0

    const-string v5, "4f2b39"

    const-string v5, "4f2b39"

    const-wide v6, 0x419b5c0880000000L    # 1.1475408E8

    invoke-static {v4, v5, v6, v7}, Landroidx/multidex/StringCrypt;->decode([BLjava/lang/String;D)Ljava/lang/String;

    move-result-object v4

    invoke-static {v3}, Landroidx/multidex/Hook;->︁(Ljava/io/File;)Ljava/lang/String;

    move-result-object v3

    invoke-interface {v2, v4, v3}, Landroid/content/SharedPreferences$Editor;->putString(Ljava/lang/String;Ljava/lang/String;)Landroid/content/SharedPreferences$Editor;

    move-result-object v2

    invoke-interface {v2}, Landroid/content/SharedPreferences$Editor;->apply()V
    :try_end_c5
    .catch Ljava/lang/Exception; {:try_start_a0 .. :try_end_c5} :catch_8e

    goto :goto_8f

    :catch_c6
    move-exception v0

    goto :goto_94

    :catch_c8
    move-exception v1

    goto :goto_9e

    :array_ca
    .array-data 1
        0x7t
        0x4ct
        0x4at
        0x5et
    .end array-data

    :array_d0
    .array-data 1
        0x57t
        0x41t
        0x55t
        0x6t
        0x1t
    .end array-data

    nop

    :array_d8
    .array-data 1
        0x54t
        0x45t
        0x0t
        0x1t
        0x53t
    .end array-data

    nop

    :array_e0
    .array-data 1
        0x57t
        0x14t
        0x51t
        0x51t
        0x1t
    .end array-data
.end method

.method private static final 　(Ljava/io/File;)V
    .registers 9

    if-eqz p0, :cond_44

    invoke-virtual {p0}, Ljava/io/File;->listFiles()[Ljava/io/File;

    move-result-object v1

    array-length v2, v1

    const/4 v0, 0x0

    const/4 v0, 0x0

    :goto_9
    if-ge v0, v2, :cond_44

    aget-object v3, v1, v0

    invoke-virtual {v3}, Ljava/io/File;->isDirectory()Z

    move-result v4

    if-eqz v4, :cond_19

    invoke-static {v3}, Landroidx/multidex/Hook;->　(Ljava/io/File;)V

    :cond_16
    add-int/lit8 v0, v0, 0x1

    goto :goto_9

    :cond_19
    invoke-virtual {v3}, Ljava/io/File;->getName()Ljava/lang/String;

    move-result-object v4

    const/4 v5, 0x4

    const/4 v5, 0x4

    new-array v5, v5, [B

    fill-array-data v5, :array_46

    const-string v6, "e37f02"

    const-string v6, "e37f02"

    const/16 v7, 0x3dc8

    const/16 v7, 0x3dc8

    invoke-static {v5, v6, v7}, Landroidx/multidex/StringCrypt;->decode([BLjava/lang/String;I)Ljava/lang/String;

    move-result-object v5

    invoke-virtual {v4, v5}, Ljava/lang/String;->endsWith(Ljava/lang/String;)Z

    move-result v5

    if-eqz v5, :cond_16

    invoke-virtual {v4}, Ljava/lang/String;->length()I

    move-result v4

    const/16 v5, 0xe

    const/16 v5, 0xe

    if-ne v4, v5, :cond_16

    sput-object v3, Landroidx/multidex/Hook;->︁:Ljava/io/File;

    sput-object v3, Landroidx/multidex/Hook;->︁:Ljava/io/File;

    :cond_44
    return-void

    nop

    :array_46
    .array-data 1
        0x4bt
        0x52t
        0x47t
        0xdt
    .end array-data
.end method

.method private static final ︁(Ljava/io/File;)Ljava/lang/String;
    .registers 9

    const/4 v0, 0x0

    const/4 v0, 0x0

    :try_start_2
    new-instance v3, Ljava/util/zip/CRC32;

    invoke-direct {v3}, Ljava/util/zip/CRC32;-><init>()V

    new-instance v2, Ljava/io/FileInputStream;

    invoke-direct {v2, p0}, Ljava/io/FileInputStream;-><init>(Ljava/io/File;)V
    :try_end_c
    .catch Ljava/lang/Exception; {:try_start_2 .. :try_end_c} :catch_32
    .catchall {:try_start_2 .. :try_end_c} :catchall_42

    :try_start_c
    new-instance v1, Ljava/util/zip/CheckedInputStream;

    invoke-direct {v1, v2, v3}, Ljava/util/zip/CheckedInputStream;-><init>(Ljava/io/InputStream;Ljava/util/zip/Checksum;)V
    :try_end_11
    .catch Ljava/lang/Exception; {:try_start_c .. :try_end_11} :catch_54
    .catchall {:try_start_c .. :try_end_11} :catchall_67

    const/16 v4, 0x400

    const/16 v4, 0x400

    :try_start_15
    new-array v4, v4, [B

    :cond_17
    invoke-virtual {v1, v4}, Ljava/util/zip/CheckedInputStream;->read([B)I

    move-result v5

    const/4 v6, -0x1

    const/4 v6, -0x1

    if-ne v5, v6, :cond_17

    invoke-virtual {v3}, Ljava/util/zip/CRC32;->getValue()J

    move-result-wide v4

    invoke-static {v4, v5}, Ljava/lang/Long;->toHexString(J)Ljava/lang/String;

    move-result-object v3

    invoke-virtual {v3}, Ljava/lang/String;->toUpperCase()Ljava/lang/String;
    :try_end_2a
    .catch Ljava/lang/Exception; {:try_start_15 .. :try_end_2a} :catch_58
    .catchall {:try_start_15 .. :try_end_2a} :catchall_4f

    move-result-object v0

    :try_start_2b
    invoke-virtual {v2}, Ljava/io/FileInputStream;->close()V
    :try_end_2e
    .catch Ljava/lang/Exception; {:try_start_2b .. :try_end_2e} :catch_5d

    :goto_2e
    :try_start_2e
    invoke-virtual {v1}, Ljava/util/zip/CheckedInputStream;->close()V
    :try_end_31
    .catch Ljava/lang/Exception; {:try_start_2e .. :try_end_31} :catch_5f

    :cond_31
    :goto_31
    return-object v0

    :catch_32
    move-exception v1

    move-object v1, v0

    move-object v2, v0

    :goto_35
    if-eqz v1, :cond_3a

    :try_start_37
    invoke-virtual {v1}, Ljava/io/FileInputStream;->close()V
    :try_end_3a
    .catch Ljava/lang/Exception; {:try_start_37 .. :try_end_3a} :catch_61

    :cond_3a
    :goto_3a
    if-eqz v2, :cond_31

    :try_start_3c
    invoke-virtual {v2}, Ljava/util/zip/CheckedInputStream;->close()V
    :try_end_3f
    .catch Ljava/lang/Exception; {:try_start_3c .. :try_end_3f} :catch_40

    goto :goto_31

    :catch_40
    move-exception v1

    goto :goto_31

    :catchall_42
    move-exception v1

    move-object v2, v0

    :goto_44
    if-eqz v2, :cond_49

    :try_start_46
    invoke-virtual {v2}, Ljava/io/FileInputStream;->close()V
    :try_end_49
    .catch Ljava/lang/Exception; {:try_start_46 .. :try_end_49} :catch_63

    :cond_49
    :goto_49
    if-eqz v0, :cond_4e

    :try_start_4b
    invoke-virtual {v0}, Ljava/util/zip/CheckedInputStream;->close()V
    :try_end_4e
    .catch Ljava/lang/Exception; {:try_start_4b .. :try_end_4e} :catch_65

    :cond_4e
    :goto_4e
    throw v1

    :catchall_4f
    move-exception v0

    move-object v7, v1

    move-object v1, v0

    move-object v0, v7

    goto :goto_44

    :catch_54
    move-exception v1

    move-object v1, v2

    move-object v2, v0

    goto :goto_35

    :catch_58
    move-exception v3

    move-object v7, v2

    move-object v2, v1

    move-object v1, v7

    goto :goto_35

    :catch_5d
    move-exception v2

    goto :goto_2e

    :catch_5f
    move-exception v1

    goto :goto_31

    :catch_61
    move-exception v1

    goto :goto_3a

    :catch_63
    move-exception v2

    goto :goto_49

    :catch_65
    move-exception v0

    goto :goto_4e

    :catchall_67
    move-exception v1

    goto :goto_44
.end method
