const getSearchedData = (notes, searchFilter) => {
    let searchedData = [...notes];
    if (searchFilter !== "") {
        searchedData = notes.filter(note => note.title.toLowerCase().includes(searchFilter.toLowerCase()))
    }
    return searchedData;
}

export { getSearchedData };