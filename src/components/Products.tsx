import {useEffect, useState} from "react";
import axios from "axios";
import {Paper, TableContainer} from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from "@mui/material/Box";

const Product = () => {

  const [products, setProducts] = useState<[]>(null)

  useEffect(() => {
    axios.get('http://localhost:8080/products')
      .then(response => {
        setProducts(response.data)
        console.log(response.data)
      })
  }, [])

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <TableContainer component={Paper} style={{width:'70%'}}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Brand</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Acquisition Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { products !== null ? products.map((product) => (
                <TableRow>
                  <TableCell align="right">{product["id"]}</TableCell>
                  <TableCell align="right">{product["name"]}</TableCell>
                  <TableCell align="right">{product["brand"]}</TableCell>
                  <TableCell align="right">{product["description"]}</TableCell>
                  <TableCell align="right">{product["price"]}</TableCell>
                  <TableCell align="right">{product["acquisitionDate"]}</TableCell>
                </TableRow>
                )
              ) : (<div>Loading...</div>)}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  )
}

export default  Product