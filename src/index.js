const { app, BrowserWindow, Menu, ipcMain} = require('electron');
const url = require('url');
const path = require('path');

let mainWindow;
let newProductWindow;

function createNewProductWindow(){
    newProductWindow = new BrowserWindow({

        webPreferences:{
            nodeIntegration: true
        },
        width: 400,
        height: 330,
        title: 'Vainilla -> Crear nuevo producto'
    });

    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-product.html'),
        protocol: 'file',
        slashes: true
    }))

}

ipcMain.on('product:new', (e, newProduct) => {
    mainWindow.webContents.send('product:new', newProduct);
    newProductWindow.close();
})

ipcMain.on('tab:createNew', (e) => {
    createNewProductWindow();
});





const templateMenu = [
    {
        label: 'Archivo',
        submenu: [
            {
                label: 'Nuevo producto',
                accelerator: 'Ctrl+N',
                click(){
                    createNewProductWindow();
                }
            },
            {
                label: 'Eliminar todos los productos',
                click(){
                    mainWindow.webContents.send('products:remove');
                }
            },
            {
                label: 'Salir de la app',
                accelerator: 'Ctrl+W',
                click(){
                    app.quit();
                }
            }
        ]
    },

    {
        label: 'Herramientas',
        submenu: [
            {
                label: 'Buscar producto',
                accelerator: 'Ctrl+B',
                click(){
                    //
                }
            }
        ]
    },
    {
        label: 'Produccion',
        submenu:[
            {
                label: 'Modo dessarollador',
                accelerator: 'Ctrl+I',
                click(item, focusedWindow){
                    focusedWindow.toggleDevTools();
                }
            }
        ]
    }
]

app.on('ready', () => {
    mainWindow = new BrowserWindow({

        webPreferences:{
            nodeIntegration: true
        }

    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))

    const mainMenu =  Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', ()=>{
        app.quit();
    });

});