import {useContext} from 'react';
import AureosContext from '../context/AureosContext';
function useAureos() {
  return useContext(AureosContext);
}

export default useAureos
