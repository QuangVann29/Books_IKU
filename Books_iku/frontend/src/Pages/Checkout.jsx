import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { AddIcon } from "@chakra-ui/icons";
import { addOrderItems } from "../Redux/Order/order.Action";
import { useNavigate } from "react-router-dom";
import { cartRest } from "../Redux/Cart/cart.Action";

const initialAddress = {
  city: "",
  state: "",
  mobile: "",
  Pincode: "",
};

const CheckOut = () => {
  const [address, setAddress] = useState(initialAddress);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [total, setTotal] = useState(0);
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartData } = useSelector((store) => store.cart);

  useEffect(() => {
    setTotal(
      cartData
        .reduce((acc, el) => acc + Number(el.price * el.qty), 0)
        .toFixed(2)
    );
  }, [cartData]);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleBuyNow = () => {
    if (
      address.addres === "" ||
      address.user === "" ||
      address.mobile === "" ||
      address.note === ""
    ) {
      return toast({
        title: "Please fill Address.",
        description: `Address is required for delivery`,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
    dispatch(addOrderItems(cartData));
    toast({
      title: "Order Success.",
      description: `Order Amount VND: ${total}`,
      status: "success",
      duration: 2000,
      isClosable: true,
    });
    navigate("/order");
    dispatch(cartRest());
  };

  const totalItems = cartData.length;
  // const totalPrice = cartData.reduce((acc, item) => acc + item.price, 0);

  function InitialFocus() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = React.useRef(null);
    const finalRef = React.useRef(null);

    return (
      <>
        <Button onClick={onOpen}>Thêm địa chỉ của bạn</Button>
        <Modal
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Địa chỉ của bạn</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <FormControl mt={4}>
                <FormLabel>Địa chỉ</FormLabel>
                <Input
                  type="text"
                  name="addres"
                  value={address.addres}
                  onChange={handleAddressChange}
                  placeholder="addres"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Người dùng</FormLabel>
                <Input
                  type="text"
                  name="user"
                  value={address.user}
                  onChange={handleAddressChange}
                  placeholder="user"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Mobile</FormLabel>
                <Input
                  type="number"
                  name="mobile"
                  value={address.mobile}
                  onChange={handleAddressChange}
                  placeholder="number"
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Lưu ý</FormLabel>
                <Input
                  type="number"
                  name="note"
                  value={address.note}
                  onChange={handleAddressChange}
                  placeholder="note"
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button onClick={onClose} colorScheme="blue" mr={3}>
                Thêm
              </Button>
              <Button onClick={onClose}>Hủy</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <Box p={4} mt={"50px"} background={"#9F3194"} color={"white"}  >
      <Heading color={"black"} textAlign={"center"} >
        Thanh toán
      </Heading>

      <Stack spacing={4} >
        <Heading as="h2" size="md" mb={2}>
          Địa chỉ giao hàng
        </Heading>
        <Box color={"black"}>
          <AddIcon /> {InitialFocus()}
        </Box>
        <Grid
          templateColumns="repeat(3, 1fr)"
          alignItems=""
          background="black"
          color="white"
           display={"flex"}
          gap={"10px"}
          justifyContent={"space-between"}
          mb={2}
        >
          <Text fontWeight="bold" >
            Địa chỉ: <Box color={"black"}> <input type="text" defaultValue={address.addres} /></Box>
          </Text>
          <Text fontWeight="bold" >
            Người dùng:- <Box color={"black"}> <input type="text" defaultValue={address.user} /></Box>
          </Text>
          <Text fontWeight="bold" >
            Số điện thoại:- <Box color={"black"}> <input type="text" defaultValue={address.mobile} /></Box>
          </Text>
          <Text fontWeight="bold" >
            Lưu ý:- <Box color={"black"}> <input type="text" defaultValue={address.note} /></Box>
          </Text>
        </Grid>

        <Heading as="h2" size="md" color={"white"} mb={2}>
          Giỏ hàng ({totalItems})
        </Heading>
        <Box height={"200px"} overflowY={"scroll"} background={"black"} color={"white"} id="example">
          {cartData.map((item) => (
            <Grid
              key={item._id}
              templateColumns="repeat(4, 1fr)"
              alignItems="center"
              gap={2}
              mb={2}
              border={"1px solid white"}
            >
              <Image
                objectFit="cover"
                height="200px"
                width={"auto"}
                src={item.image}
                alt={item.title}
                padding="10px"
              />
              <Text fontSize={"bold"}>{item.title}</Text>
              <Text fontSize={"bold"}>{item.qty}</Text>
              <Text>{item.price}VND</Text>
            </Grid>
          ))}
        </Box>

        <Box>
          <Grid templateColumns="repeat(2, 1fr)" gap={4} alignItems="center" background={"black"} color={"white"}>
            <Text>Tổng số mặt hàng:</Text>
            <Text>{totalItems}</Text>
            <Text>Tổng số lượng:</Text>
            <Text>{cartData.reduce((acc, el) => acc + Number(el.qty), 0)}</Text>
            <Text>Tổng giá:</Text>
            <Text>{total}VND</Text>
          </Grid>
        </Box>

        <FormControl background={"black"} color={"white"}>
          <FormLabel>Phương thức thanh toán</FormLabel>
          <Stack direction="row" spacing={4}>
            <Checkbox
              value="cash"
              isChecked={paymentMethod === "cash"}
              onChange={handlePaymentMethodChange}
            >
              Thanh toán khi giao hàng
            </Checkbox>
            <Checkbox
              value="card"
              isChecked={paymentMethod === "card"}
              onChange={handlePaymentMethodChange}
            >
              Thẻ
            </Checkbox>
          </Stack>
        </FormControl>

        <Button colorScheme="teal" onClick={handleBuyNow}>
          Buy Now
        </Button>
      </Stack>
    </Box>
  );
};

export default CheckOut;