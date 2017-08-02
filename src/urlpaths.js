
import axios from 'axios';
import priv from './config';


var UrlPaths = getPaths();

function getPaths() {
     //Get base url & file path etc from api
    axios.get('https://api.themoviedb.org/3/configuration?api_key=' + priv.API_KEY)
    .then(function (response) {
    //iconsole.log(response.data.images);
    //console.log(1);
    return response.data.images;
    })
    .catch(function (error) {
    console.log(error);
    });
    //console.log(this.state);

}
    


export default UrlPaths;