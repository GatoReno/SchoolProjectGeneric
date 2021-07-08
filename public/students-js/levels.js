function getAllLevels(){
    $.ajax({
        type: 'GET',
        url: '/all-levels-json',
        dataType: 'json',
        success: (data) => {
            if(data.length > 0)
            {
                data.forEach( ( item ) => {
                    const row = `<option value="${ item.id }">
                        ${ item.name }
                       </option>`;
                    $('#levels').append( row );
                });
              
            }
            else
            {
                $('#selectLevels').remove(); 
                $('#messageLevels').append('There are no levels in system,please add levels')    
            }
        }

    });
};


getAllLevels();