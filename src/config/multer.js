const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

/*
    Multer é responsavel pela manipulação de arquivos dentro da app
    Realizando a requisição de;
    dest - Path.resolve padroniza a rota da pasta (windows,mac,linux)
    Storage - É onde o arquivo vai ser armazenado, no caso, na propria maquina que esta rodando na file tmp
    filename: Para nao ocorrer de diversos usuarios sobreescreverem os arquivos, cada arquivo tem um Hash de 16 bytes aleatorios antes do nome
        Ex: ui17y39187ywe3-Nome_Do_Arquivo.jpg
    cb - CallBack, caso de algum erro (throw Exception)
*/

module.exports = {
    dest: path.resolve(__dirname, "..", "..", "tmp"),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, "..", "..", "tmp"))
        },
        filename: (req, file, cb) => {
            crypto.randomBytes(16, (err, hash) => {
                if (err)
                    cb(err)
                
                file.key = `${hash.toString('hex')}-${file.originalname}`

                cb(null, file.key)
            })
        }
    })
}
