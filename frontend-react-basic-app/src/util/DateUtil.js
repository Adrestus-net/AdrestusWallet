import moment from 'moment';

function getTimeInString() {
    const now = moment().toDate();
    const news=moment.utc(now, "YYYY-MM-DD HH:mm:ss.SSS");
    var result=news.toDate().toISOString().replace('T'," ").replace("Z",'')
    return result.toString();
}
export default getTimeInString;