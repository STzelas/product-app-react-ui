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

  const [products, setProducts] = useState<[]>([])

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
                <TableCell align="left">Name</TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Brand</TableCell>
                <TableCell align="left">Price</TableCell>
                <TableCell align="left">Acquisition Date</TableCell>
                <TableCell align="left">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              { products !== null ? products.map((product) => (
                <TableRow>
                  <TableCell align="left">{product["id"]}</TableCell>
                  <TableCell align="left">{product["name"]}</TableCell>
                  <TableCell align="left">{product["brand"]}</TableCell>
                  <TableCell align="left">{product["description"]}</TableCell>
                  <TableCell align="left">{product["price"]}</TableCell>
                  <TableCell align="left">{product["acquisitionDate"]}</TableCell>
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