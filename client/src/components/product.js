import React, { Component } from "react";
import { Box, Block, Heading, Tag} from 'react-bulma-components'
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBarcode } from '@fortawesome/free-solid-svg-icons'
import ReactLoading from 'react-loading';
import Search from './img/nature-plant.svg'

export default class Product extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      isVegan: '',
      image: '',
      loading: true
    }
  }

  componentDidMount() {
    console.log(this.props.barcode);
    axios.get("http://localhost:5000/", {
        params: {
          upc: this.props.barcode
        }
      })
      .then(res => {
        if (res.data !== "Product not found.") {
          this.setState({
            name: res.data.name,
            isVegan: res.data.isVegan,
            image: res.data.image,
            loading: false
          });
          console.log(this.state);
        }
      })
      .catch(err => console.log(err))
  }

  render() {
    var result = this.state.isVegan? 
    <Tag rounded color="success" colorVariant="light" size="medium">Vegan</Tag> : 
    <Tag rounded color="danger" colorVariant="light" size="medium">Not Vegan</Tag> 
    return (
      <Box id="result">
        <Heading subtitle weight="light" size="6" mb="3" className="blue">
          <FontAwesomeIcon icon={faBarcode} size="lg" color="darkolivegreen"/> UPC: {this.props.barcode}
        </Heading>
        {this.state.loading? <ReactLoading type="bubbles" color="darkseagreen" height="auto" width="auto"/> : <div>
        {this.state.image ? 
          <div><Heading subtitle weight="light" size="5" mb="3" className="blue">{this.state.name}</Heading>
          <img src={this.state.image} alt="Product" id="product"/>
          <Block py="1">{result}</Block></div> : 
          <div>
            <img src={Search} alt="404 Search" id="search"/>
            <Block textWeight="light" mt="0" className="blue">This product was not found in the food database.
            <br/>Please try again or scan a different product.</Block></div>}</div>}
      </Box>
    );
  }
}
