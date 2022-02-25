import axios from "axios";
import { Button, Tab, Tabs, ThemeProvider, unstable_createMuiStrictModeTheme } from "@material-ui/core";
import { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import CustomPagination from "../../components/Pagination/CustomPagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import{TextField}from "@material-ui/core";

const Search = () => {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();

    const floattheme = unstable_createMuiStrictModeTheme({
        palette: {
          type: "dark",
        },
    });
      
    const fetchSearch = async () => {
        try {
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
          );
          setContent(data.results);
          setNumOfPages(data.total_pages);
          // console.log(data);
        } catch (error) {
          console.error(error);
        }
    };
    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
      }, [type, page]);

    return (
        <div>
          <ThemeProvider theme={floattheme}>
            <div style ={{display: "flex",margin: "15px 0"}}>
            <TextField
                style={{ flex: 1 }}
                className="searchBox"
                label="Search"
                variant="filled"
                onChange={(e) => setSearchText(e.target.value)}
            />
            <Button onClick={fetchSearch} varient='contained' style={{marginLeft:10}}>
            <SearchIcon fontSize="large"/>
            </Button>
            </div>
            <Tabs value={type}
                 indicatorColor="secondary"
                textColor="secondary"
                onChange={(event, newValue) => {
                setType(newValue);
                setPage(1);
                 }}
                style={{ paddingBottom: 5 }}
                aria-label="disabled tabs example"
                >
                <Tab style={{ width: "50%" }} label="Search Movies" />
                <Tab style={{ width: "50%" }} label="Search TV Series" />

            </Tabs>
          </ThemeProvider>
            <div className="trending">
                {content &&
                content.map((c) => (
                <SingleContent
                    key={c.id}
                    id={c.id}
                    poster={c.poster_path}
                    title={c.title || c.name}
                    date={c.first_air_date || c.release_date}
                    media_type={type ? "tv" : "movie"}
                    vote_average={c.vote_average}
                />
                 ))}
            {searchText &&
              !content &&
              (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)}
            </div>
            {numOfPages > 1 && (
            <CustomPagination setPage={setPage} numOfPages={numOfPages} />
             )}
        </div>
    );
};

export default Search;