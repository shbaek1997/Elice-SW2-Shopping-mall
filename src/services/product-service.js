const { productModel } = require('../db/models/product-model');
const {categoryModel} = require('../db/models/category-model');
class ProductService {
    
    constructor(productModel){
        this.productModel = productModel;
    }
    
    // 1. 전체 상품 목록 조회 기능
    // a. pagination 추가하기
    // b. views 순으로 정렬하기
    async findAllProducts(){
        const productList = await this.productModel.findAllProducts();
        return productList;
    }
    
    // 2. 카테고리별 상품 조회 기능
    // a. pagination 추가하기
    // b. views 순으로 정렬하기
    async findByCategory(category){
        const productList = await this.productModel.findByCategory({category: category});
        return productList;
    }
    // 3. 상품 상세 정보 조회 기능
    // a. 요청 올 때마다 views += 1
    async findById(productId){
        const product = await this.productModel.findById(productId);
        return product;
    }

    // 4. 상품 추가 기능
    async addProduct(productInfo){
        const { productName }= productInfo

        const product = await this.productModel.findByName(productName);

        if(product){
            throw new Error("이미 존재하는 상품명입니다. 새로운 이름을 등록해주세요.");
        }

        const addedProduct = await this.productModel.create(productInfo);
        
        const categoryName = addedProduct.category;
        const productId = addedProduct.productId;
        
        await categoryModel.updateCategory(categoryName, productId)

        return addedProduct;
    }
    
    // 5. 상품 수정 기능
    async updateProduct(productId, update){
        const updatedProduct = await productModel.updateProduct(productId, update);
        return updatedProduct;
    }
    // 6. 상품 삭제 기능
    async deleteProduct(productId){
        const deletedProduct = productModel.deleteProduct(productId);
        
        return deletedProduct;
    }

}

const productService = new ProductService(productModel);

export { productService }