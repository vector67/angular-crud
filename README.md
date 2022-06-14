# Angular CRUD

[![NPM version][npm-image]][npm-url] [![Build Status][actions-image]][actions-url] [![Dependency Status][daviddm-image]][daviddm-url]

Generating CRUD applications with the Angular CLI and Schematics.

<div>
  <p><img src="https://i.imgur.com/0MxujmK.png" alt="Scaffold files for CRUD" width="800"></p>
  <p><img src="https://i.imgur.com/u67zkJh.png" alt="Scaffold List" width="800"></p>
  <p><img src="https://i.imgur.com/36uZBGV.png" alt="Scaffold Detail View" width="800"></p>
</div>

## Tutorial: Getting Started

1. Build the angular-crud schematic:

   ```
   cd angular-crud
   npm install
   npm run build
   npm pack
   ```
   
2. Install the needed npm packages:

   ```
   cd mobile_app
   npm i --no-save ../angular-crud/*.tgz
   # or install the latest released version with: npm install -D angular-crud
   npm install
   ```

3. Switch to the python repository and run main.py. The generator is using a json5 parser.  

4. Have a look at the generated files.

5. Open the file `sidebar.component.html` and uncomment the link to the generated route.

6. Switch to the mobile_app folder of this repository and start the application:

    ```
    npm start
    ```

7. Open <http://localhost:4200> and switch to the menu item `Hotels`. You should now see your generated form.