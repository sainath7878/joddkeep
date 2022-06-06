const getSearchedData = (notes, searchFilter) => {
    let searchedData = [...notes]
    if (searchFilter === "") {
        return searchedData
    }
    else {
        searchedData = notes.filter(note => note.title.toLowerCase().includes(searchFilter.toLowerCase()))
    }
    return searchedData;
}

export { getSearchedData };