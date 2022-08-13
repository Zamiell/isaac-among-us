# isaac-among-us

<!-- markdownlint-disable MD033 -->

This is the source code for the Among Us in Isaac mod, a multiplayer recreation of the popular game [Among Us](https://store.steampowered.com/app/945360/Among_Us/), but using the [Binding of Isaac: Repentance](https://store.steampowered.com/app/1426300/The_Binding_of_Isaac_Repentance/) engine.

- You can play by [subscribing to the mod on the Steam Workshop](https://steamcommunity.com/app/250900/workshop/).
- You can chat with others by joining the [Discord server](https://discord.gg/K7Rh66G2vM)

<br>

## How to Play

See the Steam workshop page for more information on how to play the mod.

<br>

## Technical Information

- The mod is written in [TypeScript](https://www.typescriptlang.org/), using the [IsaacScript](https://isaacscript.github.io/) framework.
- The server is written in [TypeScript](https://www.typescriptlang.org/), using [PostgreSQL](https://www.postgresql.org/) and [Prisma](https://www.prisma.io/).

<br>

## Installation for Development (Windows)

Are you interested in helping with development? Then fork the repository, make some changes, and submit a pull request. Full instructions for setting up a local development environment are listed below.

### 1) Clone the Repository

- Before working with this repository, you should first become a familiar with IsaacScript. Follow the steps on [the IsaacScript getting started documentation](https://isaacscript.github.io/docs/getting-started). Once you have created a test mod and verified in-game that everything works the way it should, read on.
- Download and install [Git](https://git-scm.com/), if you don't have it already.
- Open a new [command prompt window](https://www.howtogeek.com/235101/10-ways-to-open-the-command-prompt-in-windows-10/). (Or, feel free to use Windows Terminal, PowerShell, Git Bash, etc.)
- Configure Git, if you have not done so already:
  - `git config --global user.name "Your_Username"`
  - `git config --global user.email "your@email.com"`
- Fork the repository by clicking on the button in the top-right-hand-corner of the repository page.
- Clone your forked repository:
  - `cd [the path where you want the code to live]` (optional)
  - If you already have an SSH key pair and have the public key attached to your GitHub profile, then use the following command to clone the repository via SSH:
    - `git clone git@github.com:YourUsername/racing-plus.git`
    - (Replace "YourUsername" with your GitHub username.)
  - If you do not already have an SSH key pair, then use the following command to clone the repository via HTTPS:
    - `git clone https://github.com/YourUsername/racing-plus.git`
    - (Replace "YourUsername" with your GitHub username.)
- Enter the cloned repository:
  - `cd isaac-among-us`

### 2) Install Dependencies

- Install Yarn, if you have not done so already:
  - `npm install --global yarn`
- Install dependencies:
  - `yarn install`

### 3) Change the Development Constant

- In "packages/common/constants.ts", change `IS_DEV` to true.
- In "packages/mod/constants.ts", change `USE_LOCAL_NETWORK` to true.
- In "packages/mod/constants.ts", change `REMOTE_HOSTNAME` to your IP address.

### 4) Install and Run the Mod

- Unsubscribe from the mod on the Steam Workshop, so that the "real" version of the mod will not interfere with your development version. Additionally, make sure that [all of the Among Us mod directories](https://github.com/Zamiell/isaac-faq/blob/main/directories-and-save-files.md) have been purged from your system.
- Run IsaacScript, which will compile the mod and copy it to your "mods" folder:
  - `cd packages/mod`
  - `npx isaacscript`
- Start The Binding of Isaac: Repentance.

### 5) Install and Run the Server

- Download and install [PostgreSQL](https://www.postgresql.org/download/), if you have not done so already.
- Open a new terminal/shell and navigate to the `isaac-among-us` project directory.
- Navigate to the server package:
  - `cd packages/server`
- Create a new database and set up a database user:
  - `psql -U postgres` <br>
    (Or, if you are on Linux, use `sudo -u postgres -i` and `psql`.)
  - Enter the password for the "postgres" user that you created during the installation wizard.
  - `CREATE DATABASE amongus;`;
  - `\c amongus`
  - `CREATE USER amongususer WITH PASSWORD '1234567890';`
  - `GRANT ALL PRIVILEGES ON DATABASE amongus TO amongususer;`
  - `GRANT USAGE ON SCHEMA public TO amongususer;`
  - `GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO amongususer;`
  - `GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO amongususer;`
  - `ALTER USER amongususer CREATEDB;`
  - `\q`
- Set up the environment variables:
  - `cp .env.example .env`
- Install the database schema:
  - `npx prisma migrate dev --name init`
- Build the server:
  - `npx tsc` <br>
    (or run "build.sh" if you are in Bash)
- Run the server:
  - `node --require "tsconfig-paths/register" --require "ts-node/register" "./dist/packages/server/src/main.js"` <br>
    (or run "run.sh" if you are in Bash)
