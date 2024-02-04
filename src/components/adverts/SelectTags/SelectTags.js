import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { tagsAdverts } from '../../../store/action'; 
import { CheckboxGroup } from '../../common';


function SelectTags(props) {
  
  const dispatch = useDispatch();

  const tags = useSelector(state => state.tags);


  useEffect(() => {
    dispatch(tagsAdverts(tags));
  }, [dispatch, tags]);



  return <CheckboxGroup options={tags} {...props} />;
}

export default SelectTags;
