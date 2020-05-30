var cheerio = require('cheerio')
var axios = require('axios')
var Promise = require('bluebird')
var fs = require('fs')

const baseURL = 'https://komiku.co.id'

const title = 'black clover'

const fetchPage = async(url) => {
    try {
        const result = await axios.get(url)
        return result.data
    } catch (error) {
        console.log('error while fetching page : ', error)
        throw error
    }
}

const fetchPage2 = async(url) => {

    return axios({
        'url': url,
        method: 'get',
        timeout: 10000,
    }).then(res => res.data).catch(err => console.log(err))

}

const getTitleUrl = async(title) => {

    const finalUrl = baseURL + '?post_type=manga&s=' + title

    console.log('final url : ', finalUrl)

    const html = await fetchPage(finalUrl)
        // console.log('data : ', html)
    var $ = cheerio.load(html)
        // console.log("$ : ", $.html())

    const titleUrlList = await $('.daftar .bge').map(async(i, elem) => {
        console.log('log : ', elem.children[1].attribs.href)
        console.log('logzzz : ', elem.children[1].children[3].children[1])

        const value = await getChapter(elem.children[1].attribs.href)

        value.splice(0, 1)
        console.log('value : ', value)

        jsonToFile(value, 'solution-' + elem.children[1].attribs.href.replace('//', '') + '.json')


        return value
    }).get()

    return titleUrlList
}

const toJsonObject = async(result) => {

    const data = await Promise.all(result)
    console.log('datasss : ', data)

    return data
}

const jsonToFile = async(result, filename) => {
    try {
        // var jsonData = []
        // await toJsonObject(result).then(o => {
        //     jsonData = o
        // })

        const jsonData = await toJsonObject(result)

        // const trueJson = {}

        // jsonData.forEach(data => {
        //     Object.keys(data).forEach(key => {
        //         trueJson[key] = data[key]
        //     })
        // })

        fs.writeFile(filename, jsonData, (error) => {
            if (error) {
                console.log('error : ', error)
            }
        })
    } catch (error) {
        throw error
    }
}

const getChapter = async(url) => {
    console.log('processed title url : ', url)

    const html = await fetchPage(url)


    // console.log('html : ', html)

    var $ = cheerio.load(html)

    // const downloadChapter = await $('tbody tr').map((i, elem) => {
    //     console.log('table ==> ', elem.children[5])
    // })

    const chapter = await $('.chapter tbody tr').map(async(i, elems) => {
        try {
            return elems.children[5].children[1].attribs.href
        } catch (error) {
            return elems.children[1]
        }

    }).get()

    return chapter


}

const mainFunc = async() => {
    console.log('hello world!!!')

    const url = await getTitleUrl(title)
    console.log('list url : ', url)
        // console.log(' size list : ', size)
};

mainFunc()
    .then(datas => {


    }).catch(error => {
        console.log('error : ', error)
    })