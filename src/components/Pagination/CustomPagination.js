import { ThemeProvider, unstable_createMuiStrictModeTheme } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const floattheme = unstable_createMuiStrictModeTheme({
  palette: {
    type: "dark",
  },
});
const CustomPagination =({setPage,numofPages=10})=>{
    const handlePageChange=(page) =>{
        setPage(page);
        window.scroll(0,0);
    };
    return( 
        <div  
        style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
            <ThemeProvider theme={floattheme}>
                <Pagination 
                    count={numofPages} onChange={(e)=>handlePageChange(e.target.textContent)}
                    color="secondary"    
                />
            </ThemeProvider>
        </div>
    );
};
export default CustomPagination;