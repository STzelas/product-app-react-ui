import {type ChangeEvent, useEffect, useState} from "react";
import axios from "axios";
import {Table, TableBody, TableCell, TableHeader, TableRow} from "@/components/ui/table";
import {Pencil, Trash} from "lucide-react";
import type {Types} from "@/types/types.tsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {Button} from "@/components/ui/button.tsx";
import {
  Dialog, DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog.tsx";
import { Label } from "./ui/label";
import {Input} from "@/components/ui/input.tsx";

const Product = () => {

  const [products, setProducts] = useState<Types[]>([])
  const [deleteId, setDeleteId] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [openEdit, setOpenEdit] = useState(false)
  const [newProduct, setNewProduct] = useState<Omit<Types, "id">>({
    name: '',
    description: '',
    brand: '',
    acquisitionDate: '',
    price: 0,
  })

  const [editProduct, setEditProduct] = useState<Types>({
    id: 0,
    name: '',
    description: '',
    brand: '',
    acquisitionDate: '',
    price: 0,
  })

  useEffect(() => {
    axios.get('http://localhost:8080/products')
      .then(response => {
        setProducts(response.data)
        console.log(response.data)
      })
  }, [])

  // Adding a product
  const handleAddProduct = async () => {
    try {
      console.log("Submitting product,", newProduct)
      const response = await axios.post("http://localhost:8080/products", {...newProduct})
      setProducts([...products, response.data])
      setNewProduct({...newProduct})
      handleClose()
    } catch (err) {
      console.log(err)
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewProduct({...newProduct, [e.target.name]: e.target.value})
  }

  // Editing a product
  const handleEditProduct = async (id: number | null) => {
    if (id === null || id === 0) {
      console.error("Edit product with id " + id + " not found")
      return
    }
    try {
      const response = await axios.put(`http://localhost:8080/product/${id}`, { ...editProduct })
      setProducts(products.map(product => product.id === id ? response.data : product))
      handleCloseEdit()
    } catch (err) {
      console.log("Error occurred updating the product", err)
      alert("There was an error updating the product.")
    }
  }

  const handleClickOpenEdit = (product: Types, ) => {
    setEditProduct({...product})
    setOpenEdit(true)
  }

  const handleCloseEdit = () => {
    setOpenEdit(false)
  }

  const handleChangeEdit = (e: ChangeEvent<HTMLInputElement>)=> {
    setEditProduct({...editProduct, [e.target.name]: e.target.value})
  }

  // Open alert dialog for delete
  const handleConfirmOpen = (id: number) => {
    setDeleteId(id)
    setOpen(true)
  }

  // Close alert dialog for delete
  const handleConfirmClose = () => {
    setDeleteId(null)
    setOpen(false)
  }

  const handleClickOpen = () => {
    setConfirmOpen(true)
  }

  const handleClose = () => {
    setConfirmOpen(false)
  }

  // Deleting a product
  const handleDelete = async (id: number | null) => {
    try {
      await axios.delete(`http://localhost:8080/product/${id}`)
      setProducts(products.filter(product => product["id"] !== id))
      handleConfirmClose()
    } catch (error) {
      console.log("Error occurred deleting product ", error)
      alert("Error occurred deleting product " + error)
    }
  }



  return (
    <>
      <div className="shadow-xl rounded-2xl bg-white p-5 mt-20">
        <Button className={"m-1"} variant={"default"} onClick={handleClickOpen}>Add New</Button>
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
                  <TableCell align="left">{product.id}</TableCell>
                  <TableCell align="left">{product.name}</TableCell>
                  <TableCell align="left">{product.brand}</TableCell>
                  <TableCell align="left">{product.description}</TableCell>
                  <TableCell align="left">{product.price}</TableCell>
                  <TableCell align="left">{product.acquisitionDate}</TableCell>
                  <TableCell align="center">
                    <div className="flex space-x-2">
                      <Pencil size={20} onClick={() => handleClickOpenEdit(product)}/>
                      <Trash size={20} onClick={() => handleConfirmOpen(product["id"])}/>
                    </div>
                  </TableCell>
                </TableRow>
              )
            ) : (<div>Loading...</div>)}
          </TableBody>
        </Table>
        {/*Delete a product alert dialog*/}
        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product with Id: {deleteId}.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={handleConfirmClose}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => handleDelete(deleteId)}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/*Add new product Dialog*/}
        <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
          <form>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add new Product</DialogTitle>
                <DialogDescription>
                  Add a new product here. Create a new product by clicking 'Add Product'
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Name</Label>
                  <Input onChange={handleChange} id="name" name="name" value={newProduct.name} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Brand</Label>
                  <Input onChange={handleChange} id="brand" name="brand" value={newProduct.brand} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Description</Label>
                  <Input onChange={handleChange} id="description" name="description" value={newProduct.description} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="username-1">Price</Label>
                  <Input onChange={handleChange} id="price" name="price" value={newProduct.price} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name-1">Acquisition Date</Label>
                  <Input type={"date"} onChange={handleChange} id="acquisitionDate" name="acquisitionDate" value={newProduct.acquisitionDate} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" onClick={handleClose}>Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={handleAddProduct}>Add Product</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>

      {/*Edit a product alert*/}
        <Dialog open={openEdit} onOpenChange={setOpenEdit}>
          <form>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit Product</DialogTitle>
                <DialogDescription>
                  Edit your product here. Click 'Save' to save your edit.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="id">id</Label>
                  <Input onChange={handleChangeEdit} id="id" name="id" value={editProduct["id"]} disabled={true}/>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="name">Name</Label>
                  <Input onChange={handleChangeEdit} id="name" name="name" value={editProduct.name} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="brand">Brand</Label>
                  <Input onChange={handleChangeEdit} id="brand" name="brand" value={editProduct.brand} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Input onChange={handleChangeEdit} id="description" name="description" value={editProduct.description} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="price">Price</Label>
                  <Input onChange={handleChangeEdit} id="price" name="price" value={editProduct.price} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="acquisitionDate">Acquisition Date</Label>
                  <Input type={"date"} onChange={handleChangeEdit} id="acquisitionDate" name="acquisitionDate" value={editProduct.acquisitionDate} />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" onClick={handleCloseEdit}>Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={() => handleEditProduct(editProduct["id"])}>Save</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </div>
    </>
  )
}

export default  Product