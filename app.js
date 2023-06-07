const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['info', 'informacion', 'información']).addAnswer(
    [
        '📄 las categorias 2003 hasta el 2010 entrenan MARTES-JUEVES',
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

const flowGracias = addKeyword(['sedes', 'grac']).addAnswer(
    [
        '🚀 Estas son nuestras sedes de entrenamiento',
        '[*campo-picigol*]' ,
        'https://goo.gl/maps/A4o6CSgnmU9h9FrSA?coh=178571&entry=tt',
        '[*campo-torreblanca*] ',
        'https://goo.gl/maps/ouQYf4NvpiJ6xWRg9?coh=178571&entry=tt',
        '[*llamanos*] 987654321',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)

const flowDiscord = addKeyword(['page']).addAnswer(
    ['🤪 siguenos en FB', 'https://www.facebook.com/MLsport100', '\n*2* Para siguiente paso.'],
    null,
    null,
    [flowSecundario]
)

const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot Ray* de la academia deportivas MLs')
    .addAnswer(
        [
            'te comparto los siguientes links de interes sobre el proyecto',
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
