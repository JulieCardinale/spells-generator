/*         *\
 * Imports *
\*         */

// Import : Axios
import axios from 'axios';

// Import : Actions
import { GET_SPELLS_DETAILS, saveSpellsDetails } from 'src/actions/spells';
import { stopLoading } from 'src/actions/load';

// Import : Utilities functions
import { getRandomNumber } from 'src/selectors';

// Import : datas
import spells from 'src/datas/spells';

/*         
* Harry Potter Api Call
* --> Get all Spells 
*/         
export default (store) => (next) => (action) => {
  switch (action.type) {
    case GET_SPELLS_DETAILS: {
      
      // potterapi.com is currently off. So to not change all code we temporary make fake API call & use local js file with spells list.
      axios.get('https://jcdle-porfolio.herokuapp.com') // https://www.potterapi.com/v1/spells?key=$2a$10$nmJZ60IjtEvFvRINrvR9CeKI5Ib.YtSaNL9lraVV4OOkr89z4y2U6
     
        .then((response) => {
        
          // All Spells datas
          const spellsList = spells; //response.data with potterapi.com
        
          // Get a random spell --> spellsList[randomIndexInSpellListArray]
          const randomSpell = spellsList[getRandomNumber(spellsList.length - 1)];
          
          // Dispatch random spell datas to state
          store.dispatch(saveSpellsDetails(randomSpell));

        }).catch((error) => {
         window.location = '/';
         console.log(error)
        })
        .finally(() => {
          // Stop loading
          store.dispatch(stopLoading());
        });
      break;
    }
    default:
      next(action);
      break;
  }
};
