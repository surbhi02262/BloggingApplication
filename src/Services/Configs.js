
export const getConfig = (obj, conf) => {
    let keys = Object.keys(obj)
    let newConf = JSON.parse(JSON.stringify(conf))
    let formConfig = {}
    for(let i =0; i<keys.length;i++ ){
        
        for(let j =0; j<newConf.length;j++ ){
            console.log('newConf[j].name === keys[i]', newConf[j].name , keys[i])
            if(newConf[j].name === keys[i]) {
                newConf[j]['value'] = obj[keys[i]]
                console.log('newConf[j]', newConf[j])
                console.log('obj[keys[i]]', obj[keys[i]])
            }
        }
    }
    return newConf
}