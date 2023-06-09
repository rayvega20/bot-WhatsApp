const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'para numero de celular']).addAnswer(['Llamanaos a 916854121'])

  .addAnswer(["\n*3* Menú principal."],
  { capture: true },
  (ctx, flow ) => {
    if (ctx.body === '3') {
        flow.gotoFlow(flowPrincipal);// Devolver al flujo anterior
    } 

  },
  );

const flowInfo = addKeyword(['info', 'informacion', 'información']).addAnswer(
    [
        '📄 las categorias 2003 hasta el 2010, entrenan MARTES-JUEVES',
        '📄 las categorias 2011 hasta el 2019, entrenan LUNES-MIERCOLES-VIERNES',
        '📄 futbol mujeres la categoria ES LIBRE, entrenan MARTES-JUEVES',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso s.',
    ],
    null,
    null,
    [flowSecundario]    
)

const flowTuto = addKeyword(['tutorial', 'tuto']).addAnswer(
    [
        '🙌 Aquí encontras un ejemplo rapido',
        'https://bot-whatsapp.netlify.app/docs/example/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowSedes = addKeyword(['sedes', 'grac'])
.addAnswer('🚀 Estas son nuestras sedes de entrenamiento')
.addAnswer('*CAMPO-PISCIGOL*')
.addAnswer('https://goo.gl/maps/A4o6CSgnmU9h9FrSA?coh=178571&entry=tt')
.addAnswer('*CAMPO-TORREBLANCA*')
.addAnswer(
    'https://goo.gl/maps/ouQYf4NvpiJ6xWRg9?coh=178571&entry=tt')

.addAnswer(
    [
       
       
        
        '*llamanos* 987654321',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowPage = addKeyword(['page']).addAnswer(
    ['🤪 siguenos en FB', 'https://www.facebook.com/MLsport100', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a la academia deportivas MLs')
    .addAnswer(
        [
            'porfavor diganos ¿en que le podemos ayudar?',
            '👉 *info* para ver la informacion de matricula',
            '👉 *sedes*  para ver nuestras sedes',
            '👉 *page* para ver nuestra pagina de FACEBOOK',
        ],
        null,
        null,
        [flowInfo, flowSedes, flowTuto, flowPage]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
