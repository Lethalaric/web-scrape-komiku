var cheerio = require('cheerio')
var axios = require('axios')
var Promise = require('bluebird')

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

const mainFunc = async() => {
    console.log('hello world!!!')


    const finalUrl = baseURL + '?post_type=manga&s=' + title

    console.log('final url : ', finalUrl)

    const html = await fetchPage(finalUrl)
        // console.log('data : ', html)
    var $ = cheerio.load(html)
        // console.log("$ : ", $.html())
    const size = $('.daftar .bge').map((i, elem) => {
            console.log('log : ', elem.children[1].attribs)
        })
        // console.log(' size list : ', size)
};

mainFunc()
    .then(datas => {


    }).catch(error => {
        console.log('error : ', error)
    })