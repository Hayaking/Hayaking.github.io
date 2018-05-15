---
title: 使用 Visual Studio Code 创建和运行 SQL Server 的 TRANSACT-SQL 脚本
category: SQL
---

## 安装 VS Code

1. 如果尚未安装 VS Code 中，[下载并安装 VS Code](https://code.visualstudio.com/Download)在您的计算机上。
2. 启动 VS Code。

## 安装 mssql 扩展

去vs code 的扩展商店下载安装即可

## 创建或打开 SQL 文件

**Mssql**扩展使 mssql 命令和 T-SQL 的 intellisense 功能在编辑器中的语言模式设置为时**SQL**。

1. 按**CTRL + N**。 默认情况下，Visual Studio Code 将打开一个新的“纯文本”文件。

2. 按**CTRL + K、 M**并更改到语言模式**SQL**。

   ![SQL language mode](https://docs.microsoft.com/zh-cn/sql/linux/media/sql-server-linux-develop-use-vscode/vscode-language-mode.png?view=sql-server-linux-2017)

3. 也可使用 .sql 文件扩展打开现有文件。 语言模式，则自动**SQL**扩展名为.sql 的文件。

## 连接到 SQL Server

以下步骤演示了如何使用 VS Code 连接到 SQL Server。

1. 在 VS Code 中，按 CTRL+SHIFT+P（或 F1）打开命令面板。

2. 类型**sql**以显示 mssql 命令。

   ![mssql commands](https://docs.microsoft.com/zh-cn/sql/linux/media/sql-server-linux-develop-use-vscode/vscode-commands.png?view=sql-server-linux-2017)

3. 选择**MS SQL： 连接**命令。 你可以只需键入**sqlcon**按**ENTER**。

4. 选择**创建连接配置文件**。 这将为 SQL Server 实例创建连接配置文件。

5. 按照提示为新连接配置文件指定连接属性。 指定每个值后，按 ENTER 继续。

   下表描述了连接配置文件的属性。

   | 设置                           | Description                                                  |
   | ------------------------------ | ------------------------------------------------------------ |
   | **服务器名称**                 | SQL Server 实例名称。 对于本教程中，使用**localhost**连接到您的计算机上的本地 SQL Server 实例。 如果要连接到远程 SQL Server，请输入目标 SQL Server 计算机的名称，或它的 IP 地址。 如果你需要指定 SQL Server 实例的端口，使用逗号分隔的名称。 例如对于本地服务器在端口 1401年上运行你将输入**localhost，1401年**。 |
   | **[可选]数据库名称**           | 要使用的数据库。 对于此教程的目的，不指定数据库和按**ENTER**以继续。 |
   | **用户名**                     | 输入拥有访问服务器上数据库权限的用户名。 对于本教程中，使用默认**SA** SQL Server 安装过程中创建的帐户。 |
   | **密码（SQL 登录名）**         | 输入指定用户的密码。                                         |
   | **是否保存密码？**             | 类型**是**保存密码。 否则，请键入**否**，在每次使用时连接配置文件的密码会提示您。 |
   | **[可选]输入此配置文件的名称** | 连接配置文件名称。 例如，无法将该配置文件**localhost 配置文件**。 |

6. 在状态栏中验证连接。

![Connection status](https://docs.microsoft.com/zh-cn/sql/linux/media/sql-server-linux-develop-use-vscode/vscode-connection-status.png?view=sql-server-linux-2017)

## 创建数据库

1. 在编辑器中，键入**sql**弹出的可编辑的代码段的列表。

   ![SQL snippets](https://docs.microsoft.com/zh-cn/sql/linux/media/sql-server-linux-develop-use-vscode/vscode-sql-snippets.png?view=sql-server-linux-2017)

2. 选择**sqlCreateDatabase**。

3. 在代码段中，键入**TutorialDB**数据库名称。

   SQL复制

   ```
   USE master
   GO
   IF NOT EXISTS (
      SELECT name
      FROM sys.databases
      WHERE name = N'TutorialDB'
   )
   CREATE DATABASE [TutorialDB]
   GO
   ```

4. 按**CTRL + SHIFT + E**执行 TRANSACT-SQL 命令。 在查询窗口中查看结果。

   ![create database messages](https://docs.microsoft.com/zh-cn/sql/linux/media/sql-server-linux-develop-use-vscode/vscode-create-database-messages.png?view=sql-server-linux-2017)

   提示

   可以自定义为 mssql 扩展命令绑定的快捷键。 请参阅[自定义快捷键](https://github.com/Microsoft/vscode-mssql/wiki/customize-shortcuts)。

## 创建表

1. 删除编辑器窗口中的内容。

2. 按**F1**以显示命令控制板。

3. 类型**sql**中要显示的 SQL 命令或类型的命令调色板**sqluse**为**MS SQL:Use 数据库**命令。

4. 单击**MS SQL:Use 数据库**，然后选择**TutorialDB**数据库。 此操作会将上下文更改为上一节中创建的新数据库。

   ![use database](https://docs.microsoft.com/zh-cn/sql/linux/media/sql-server-linux-develop-use-vscode/vscode-use-database.png?view=sql-server-linux-2017)

5. 在编辑器中，键入**sql**以显示这些代码段，然后选择**sqlCreateTable**按**输入**。

6. 在代码段中，键入**员工**为表名。

7. 按**选项卡**，然后键入**dbo**架构名称。

   备注

   添加片段之后，必须键入表名和架构名，而无效从 VS Code 编辑器中更改焦点。

8. 更改的列名称**Column1**到**名称**和**Column2**到**位置**。

   SQL复制

   ```
   -- Create a new table called 'Employees' in schema 'dbo'
   -- Drop the table if it already exists
   IF OBJECT_ID('dbo.Employees', 'U') IS NOT NULL
   DROP TABLE dbo.Employees
   GO
   -- Create the table in the specified schema
   CREATE TABLE dbo.Employees
   (
      EmployeesId        INT    NOT NULL   PRIMARY KEY, -- primary key column
      Name      [NVARCHAR](50)  NOT NULL,
      Location   [NVARCHAR](50)  NOT NULL
   );
   GO
   ```

9. 按**CTRL + SHIFT + E**以创建的表。

## 插入和查询

1. 添加以下语句插入到四个行**员工**表。 然后选择所有行。

   SQL复制

   ```
   -- Insert rows into table 'Employees'
   INSERT INTO Employees
      ([EmployeesId],[Name],[Location])
   VALUES
      ( 1, N'Jared', N'Australia'),
      ( 2, N'Nikita', N'India'),
      ( 3, N'Tom', N'Germany'),
      ( 4, N'Jake', N'United States')   
   GO   
   -- Query the total count of employees
   SELECT COUNT(*) as EmployeeCount FROM dbo.Employees;
   -- Query all employee information
   SELECT e.EmployeesId, e.Name, e.Location 
   FROM dbo.Employees as e
   GO
   ```

   提示

   键入时，可使用 T-SQL IntelliSense 协助。![TSQL IntelliSense](https://docs.microsoft.com/zh-cn/sql/linux/media/sql-server-linux-develop-use-vscode/vscode-intellisense.png?view=sql-server-linux-2017)

2. 按**CTRL + SHIFT + E**执行命令。 这两个结果集显示在**结果**窗口。

   ![Results](https://docs.microsoft.com/zh-cn/sql/linux/media/sql-server-linux-develop-use-vscode/vscode-result-grid.png?view=sql-server-linux-2017)

## 查看并保存结果

1. 上**视图**菜单上，选择**切换编辑器组布局**以切换到垂直或水平拆分布局。

   ![Vertical split](https://docs.microsoft.com/zh-cn/sql/linux/media/sql-server-linux-develop-use-vscode/vscode-toggle-split.png?view=sql-server-linux-2017)

2. 单击**结果**和**消息**面板标头以折叠和展开面板。

   ![Toggle Messages](https://docs.microsoft.com/zh-cn/sql/linux/media/sql-server-linux-develop-use-vscode/vscode-toggle-messages-pannel.png?view=sql-server-linux-2017)

   提示

   可以自定义 mssql 扩展的默认行为。 请参阅[自定义扩展选项](https://github.com/Microsoft/vscode-mssql/wiki/customize-options)。

3. 单击第二个结果网格上的最大化网格图标放大网格。

   ![Maximize grid](https://docs.microsoft.com/zh-cn/sql/linux/media/sql-server-linux-develop-use-vscode/vscode-maximize-grid.png?view=sql-server-linux-2017)

   备注

   T-SQL 脚本具有两个或多个结果网格时，会显示最大化图标。

4. 使用网格上的鼠标右键打开网格上下文菜单。

   ![Context menu](https://docs.microsoft.com/zh-cn/sql/linux/media/sql-server-linux-develop-use-vscode/vscode-grid-context-menu.png?view=sql-server-linux-2017)

5. 选择**选择所有**。

6. 打开网格上下文菜单，然后选择**将另存为 JSON**将结果保存到的.json 文件。

7. 为 JSON 文件指定文件名。 对于本教程中，键入**employees.json**。

8. 验证 JSON 文件是否已保存，是否已在 VS Code 中打开。

   ![Save as Json](https://docs.microsoft.com/zh-cn/sql/linux/media/sql-server-linux-develop-use-vscode/vscode-save-as-json.png?view=sql-server-linux-2017)