
# 1. Setting up the AI Translator Application

This document provides a step-by-step guide to setting up the AI Translator application, including downloading the code, configuring the Python environment, and running the application.

## 1.1. Table of Contents
- [1. Setting up the AI Translator Application](#1-setting-up-the-ai-translator-application)
  - [1.1. Table of Contents](#11-table-of-contents)
- [2. Introduction](#2-introduction)
- [3. Downloading the AI Translator](#3-downloading-the-ai-translator)
  - [3.1. Cloning the Repository](#31-cloning-the-repository)
  - [3.2. Downloading the ZIP File](#32-downloading-the-zip-file)
- [4. Setting Up the Python Virtual Environment](#4-setting-up-the-python-virtual-environment)
  - [4.1. Creating the Virtual Environment](#41-creating-the-virtual-environment)
  - [4.2. Activating the Virtual Environment](#42-activating-the-virtual-environment)
- [5. Installing Required Packages](#5-installing-required-packages)
- [6. Running the AI Translator](#6-running-the-ai-translator)
- [7. Configuring Authentication (credentials.json)](#7-configuring-authentication-credentialsjson)
- [8. Resource Considerations](#8-resource-considerations)
- [9. Attribution](#9-attribution)

---

# 2. Introduction

This document guides you through the process of setting up the AI Translator application on your local machine. The following steps include cloning or downloading the application, configuring the Python environment, installing dependencies, and running the translator.

**Key Points:**

*   The setup procedure for the AI Translator application, is described.

---

# 3. Downloading the AI Translator

You can obtain the AI Translator code either by cloning the GitHub repository or by downloading a ZIP archive.

## 3.1. Cloning the Repository

*   Create a new folder anywhere you like.
    *   **Important:** Avoid spaces in the folder name; use underscores (`_`) instead, to prevent possible errors.

*   Open Git Bash inside that folder (Right-click -> Git Bash Here). You will need Git installed for this method to work.

*   Run the following command:

    ```shell
    git clone https://github.com/PranaAI/AI_Translator.git
    ```

This will create a folder named `AI_Translator` in the folder where you ran the command.

**Key Points:**

* Cloning from git, the proper commands are listed.
* Always make sure the names are good.

---

## 3.2. Downloading the ZIP File

* The zip files do not requires having git installed and for some this would easier and preferable to use.

If you don't have Git installed, you can download the ZIP file directly from GitHub:

1.  Go to [https://github.com/PranaAI/AI_Translator](https://github.com/PranaAI/AI_Translator)
2.  Click "Code" -> "Download ZIP".

This will also include all the necessary files. The downloaded file will be named something like `AI_Translator-main.zip`.

**Key Points:**

* You can download zip format from GitHub itself.
* You do not need git installed to use zip files.

---

# 4. Setting Up the Python Virtual Environment

Before installing the Python files you must do this important setup.

*   You must have Python installed on your PC.
*   Open a terminal or use the same one you already opened.
* It is important to work inside the main Directory, the step will make it happen
* Access the inside terminal by going through this command.
```sh
cd /path/path/Your_Folder_Name/AI_Translator
```

* Go to the correct directory
  * Easy way to find out is, go to teh directory where all teh python files are. 
* And the path where it has the requirements.txt code

* Find out python details
```sh
which python
python --version
```

**Key Points:**

* Make sure what version and which is teh python being used


## 4.1. Creating the Virtual Environment

Create a virtual environment inside the `AI_Translator` folder:

```sh
python -m venv venv
```

This command creates a new folder named `venv` inside the `AI_Translator` directory. The steps needs to follow:

1. Check the folder
There will be  a new folder inside that named `venv`
* Command for that is `ls`

**Key Points:**

*This creates the python virtual environment*

## 4.2. Activating the Virtual Environment

Activate the virtual environment:

*   On Windows:

    ```sh
    source venv/Scripts/activate
    ```

*   On macOS or Linux:

    ```sh
    source venv/bin/activate
    ```

*   **Confirm that The location for python being used is correct by running teh command**:

```sh
which python
```
* This path will be inside our ` AI_Translator` folder which is what we need
* This means that if we install any python libraries those will be installed in this folder and only available via this python venv
* This makes for more error free operation



---

# 5. Installing Required Packages

We must run this inside our newly created and activated venv.

Command for that are

```sh
python.exe -m pip install --upgrade pip             # updates the pip
pip install -r requirements.txt                     # install all the needed python packages
```

* The text followed by `#` is a comment this will be ignored by the terminal.
* This will download all the needed packages
* You can see inside the `requirements.txt` file the names of the python packages
* The download will take few minutes only for it to complete all that comes though


# 6. Running the AI Translator

* Run the main python file.
```shell
python main.py
```

This will show an info like that
```shell
....
....
INFO:     Uvicorn running on http://127.0.0.1:8100 (Press CTRL+C to quit)
....
....
```

*   Now open a web browser and go to [http://127.0.0.1:8100](http://127.0.0.1:8100) this will show the UI for the Translator
*   Now if we try to translate something that will fail because we have no connection with any AI.

# 7. Configuring Authentication (credentials.json)


*   This particular Code is geared to use the `credentials.json` file we can get from the Google API

*   Get the file from google cloud and put this file inside the `private` folder



* Stop the previous one (Ctrl + c) and Try again
```text
python main.py
```

Now will have all the new changes:

* Now go to [http://127.0.0.1:8100](http://127.0.0.1:8100)

*With this, You can translate now.*

# 8. Resource Considerations

*   Install PyCharm Community edition Or Install VS Code
* I prefer Pycharm because it creates the Virtual environment automatically 
* But if your pc have less RAM then use VS Code, Pycharm will easily take 1.5 to 2.5 GB of RAM
* But for final running a simple terminal is enough so that RAM is consumed very less.


# 9. Attribution

Icons and SVGs used in this project are sourced from [SVG Repo](https://www.svgrepo.com/).

