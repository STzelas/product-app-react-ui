import {useEffect, useState} from "react";
import axios from "axios";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table";

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
      <div className="shadow-sm rounded-2xl bg-white p-5 mt-20">
        <Table aria-label="a dense table">
          <TableHeader className="w-[100px]">
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="left">Brand</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Acquisition Date</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHeader>
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
      </div>
    </>
  )
}

export default  Product


// <TableHeader>
//   <TableRow>
//     <TableHead className="w-[100px]">Invoice</TableHead>
//     <TableHead>Status</TableHead>
//     <TableHead>Method</TableHead>
//     <TableHead className="text-right">Amount</TableHead>
//   </TableRow>
// </TableHeader>
// <TableBody>
//   <TableRow>
//     <TableCell className="font-medium">INV001</TableCell>
//     <TableCell>Paid</TableCell>
//     <TableCell>Credit Card</TableCell>
//     <TableCell className="text-right">$250.00</TableCell>
//   </TableRow>
// </TableBody>