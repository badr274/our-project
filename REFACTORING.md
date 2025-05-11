# Refactoring Documentation

## Refactoring Summary
Total Refactoring Instances: 20
- Frontend: 10 code smells
- Backend: 10 code smells

### Frontend Refactoring Count
- CartPage Component: 5 code smells
- Product Management: 5 code smells

### Backend Refactoring Count
- Authentication Service: 5 code smells
- Product Service: 5 code smells

## Files Changed/Created

### Frontend Files
#### Modified
- `ECommerceFrontEnd/src/pages/CartPage.tsx`
  - Extracted cart logic to custom hook
  - Improved type safety
  - Enhanced UI components

- `ECommerceFrontEnd/src/interfaces/index.ts`
  - Updated ICartProduct interface
  - Added new type definitions

#### Created
- `ECommerceFrontEnd/src/hooks/useCart.ts`
  - New custom hook for cart logic
  - Centralized cart state management
  - Improved reusability

### Backend Files
#### Modified
- `ECommerceBackEnd/app/Services/Product/ProductService.php`
  - Implemented DTO pattern
  - Enhanced image handling
  - Improved error handling

#### Created
- `ECommerceBackEnd/app/Exceptions/AuthException.php`
  - New custom exception class
  - Standardized error handling
  - Improved error messages

- `ECommerceBackEnd/app/DTOs/ProductData.php`
  - New DTO for product data
  - Enhanced data validation
  - Improved type safety

## What is DTO?

DTO (Data Transfer Object) is a design pattern used to transfer data between different layers of an application. In our refactoring, we implemented DTOs to solve several problems:

### Purpose of DTOs
1. **Data Encapsulation**
   - Bundles related data into a single object
   - Provides a clear structure for data transfer
   - Reduces the number of method calls

2. **Type Safety**
   - Enforces data structure through TypeScript/PHP types
   - Prevents runtime errors from incorrect data shapes
   - Makes refactoring safer and easier

3. **Validation**
   - Centralizes data validation logic
   - Ensures data integrity before processing
   - Reduces duplicate validation code

### Example from Our Code
```typescript
// Frontend DTO
export class ProductData {
  constructor(
    public readonly title: string,
    public readonly price: number,
    public readonly description: string,
    public readonly image?: File
  ) {}

  toArray(): Record<string, any> {
    return {
      title: this.title,
      price: this.price,
      description: this.description,
      image: this.image
    };
  }
}

// Backend DTO
class ProductData
{
    public function __construct(
        public readonly string $title,
        public readonly float $price,
        public readonly string $description,
        public readonly ?UploadedFile $image = null
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            $request->input('title'),
            $request->input('price'),
            $request->input('description'),
            $request->file('image')
        );
    }
}
```

### Benefits in Our Project
1. **Improved Code Organization**
   - Separates data structure from business logic
   - Makes code more maintainable
   - Reduces complexity in services

2. **Better Error Handling**
   - Validates data at the DTO level
   - Provides clear error messages
   - Prevents invalid data from reaching services

3. **Enhanced Type Safety**
   - Frontend: TypeScript interfaces ensure correct data shape
   - Backend: PHP type hints prevent type-related errors
   - Both: Better IDE support and autocompletion

4. **Reduced Duplication**
   - Single source of truth for data structure
   - Reusable validation logic
   - Consistent data handling across the application

## Frontend Refactoring

### CartPage Component
1. **Component Structure**
   - Extracted cart logic into a custom `useCart` hook
   - Improved separation of concerns
   - Removed direct Redux state management from component

2. **Type Safety Improvements**
   - Fixed property access for `ICartProduct` interface
   - Corrected nested object access (`item.product.title`, `item.product.price`)
   - Updated `QuantitySelector` props to match interface requirements

3. **UI Enhancements**
   - Added product image display in cart items
   - Improved layout with flex container for product information
   - Added proper styling for images (rounded corners, object-fit)

4. **Code Cleanup**
   - Removed unused `TableCaption` import
   - Simplified price calculations
   - Improved code organization and readability

#### Code Smells Identified
1. **Large Class/Component**
   - Component handling too many responsibilities
   - Excessive calculations and state management
   - Complex nested logic

2. **Feature Envy**
   - Component directly manipulating Redux state
   - Business logic mixed with presentation

3. **Primitive Obsession**
   - Direct manipulation of raw data structures
   - Lack of proper type safety with ICartProduct interface

4. **Shotgun Surgery**
   - Changes to cart logic require modifications in multiple places
   - State management scattered across component

5. **Duplicate Code**
   - Price calculations repeated across components
   - Similar UI patterns not extracted into reusable components
   - Redundant state management logic

#### Before Refactoring
```typescript
// CartPage.tsx
const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const estimateShipping = totalPrice > 100 ? 0 : 10;

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  return (
    // ... complex JSX with direct state access
    <TableCell>{item.title}</TableCell>
    <TableCell>${item.price}</TableCell>
    <TableCell>
      <QuantitySelector product={item} />
    </TableCell>
  );
};
```

#### After Refactoring
```typescript
// CartPage.tsx
const CartPage = () => {
  const { cartItems, totalPrice, estimateShipping, handleRemoveFromCart } = useCart();
  
  return (
    // ... cleaner JSX with proper type safety
    <TableCell>
      <div className="flex items-center gap-2">
        <img
          src={item.product.image}
          alt={item.product.title}
          className="w-16 h-16 object-cover rounded"
        />
        <span>{item.product.title}</span>
      </div>
    </TableCell>
    <TableCell>${item.product.price}</TableCell>
    <TableCell>
      <QuantitySelector initialQuantity={item.quantity} id={item.id} />
    </TableCell>
  );
};
```

### Product Management
1. **Data Structure**
   - Implemented `ProductData` DTO for better data handling
   - Improved type safety in product-related components
   - Enhanced data validation and transformation

2. **State Management**
   - Centralized product state management
   - Improved error handling for product operations
   - Enhanced loading states and user feedback

#### Code Smells Identified
1. **Data Class**
   - Lack of encapsulation
   - Direct state manipulation
   - Missing validation logic

2. **Primitive Obsession**
   - Using raw types instead of proper domain objects
   - Inconsistent data handling

3. **Temporary Field**
   - Inconsistent state management
   - Missing validation

4. **Feature Envy**
   - Business logic mixed with UI components
   - Direct state manipulation in components

5. **Inappropriate Intimacy**
   - Components directly accessing and modifying each other's state
   - Tight coupling between product and cart components
   - Direct manipulation of shared state

#### Before Refactoring
```typescript
// ProductService.ts
interface Product {
  id: number;
  title: string;
  price: number;
  // ... other properties
}

const createProduct = (data: any) => {
  // Direct state manipulation
  return dispatch(createProductAction(data));
};
```

#### After Refactoring
```typescript
// ProductData.ts
export class ProductData {
  constructor(
    public readonly title: string,
    public readonly price: number,
    public readonly description: string,
    public readonly image?: File
  ) {}

  toArray(): Record<string, any> {
    return {
      title: this.title,
      price: this.price,
      description: this.description,
      image: this.image
    };
  }
}

// ProductService.ts
const createProduct = (data: ProductData) => {
  return dispatch(createProductAction(data.toArray()));
};
```

## Backend Refactoring

### Authentication Service
1. **Error Handling**
   - Created custom `AuthException` class
   - Standardized authentication error responses
   - Improved error message clarity and consistency

2. **Code Organization**
   - Separated authentication logic into dedicated service
   - Enhanced security practices
   - Improved token management

#### Code Smells Identified
1. **Error Code**
   - Inconsistent error handling
   - Generic exception usage
   - Lack of standardized error responses

2. **Shotgun Surgery**
   - Authentication logic scattered across codebase
   - Changes require modifications in multiple places

3. **Message Chains**
   - Long chains of method calls for authentication
   - Complex validation logic

4. **Temporary Field**
   - Inconsistent state management in authentication flow
   - Missing validation steps

5. **Middle Man**
   - Unnecessary delegation of authentication logic
   - Extra layers of abstraction without value
   - Redundant method calls

#### Before Refactoring
```php
// AuthService.php
public function login($credentials)
{
    if (!$user = $this->validateCredentials($credentials)) {
        throw new \Exception('Invalid credentials');
    }
    
    if (!$user->hasPermission('login')) {
        throw new \Exception('Insufficient permissions');
    }
    
    return $this->generateToken($user);
}
```

#### After Refactoring
```php
// AuthException.php
class AuthException extends Exception
{
    public static function invalidCredentials(): self
    {
        return new self('Invalid credentials provided');
    }

    public static function insufficientPermissions(): self
    {
        return new self('User does not have required permissions');
    }
}

// AuthService.php
public function login($credentials)
{
    if (!$user = $this->validateCredentials($credentials)) {
        throw AuthException::invalidCredentials();
    }
    
    if (!$user->hasPermission('login')) {
        throw AuthException::insufficientPermissions();
    }
    
    return $this->generateToken($user);
}
```

### Product Service
1. **Data Transfer Objects**
   - Implemented `ProductData` DTO
   - Enhanced data validation
   - Improved image handling logic

2. **Service Layer**
   - Better separation of concerns
   - Improved error handling
   - Enhanced maintainability

#### Code Smells Identified
1. **Data Class**
   - Lack of proper data encapsulation
   - Direct request data manipulation
   - Missing validation

2. **Feature Envy**
   - Image handling logic scattered across codebase
   - Business logic mixed with data handling

3. **Primitive Obsession**
   - Using raw request data instead of proper DTOs
   - Inconsistent data validation

4. **Shotgun Surgery**
   - Changes to product handling require modifications in multiple places
   - Scattered image handling logic

5. **Speculative Generality**
   - Over-engineered image handling
   - Unnecessary abstraction layers
   - Complex solutions for simple problems

#### Before Refactoring
```php
// ProductService.php
public function createProduct(Request $request)
{
    $data = $request->all();
    
    if ($request->hasFile('image')) {
        $data['image'] = $request->file('image')->store('products');
    }
    
    return $this->productRepo->create($data);
}
```

#### After Refactoring
```php
// ProductData.php
class ProductData
{
    public function __construct(
        public readonly string $title,
        public readonly float $price,
        public readonly string $description,
        public readonly ?UploadedFile $image = null
    ) {}

    public static function fromRequest(Request $request): self
    {
        return new self(
            $request->input('title'),
            $request->input('price'),
            $request->input('description'),
            $request->file('image')
        );
    }

    public function toArray(): array
    {
        $data = [
            'title' => $this->title,
            'price' => $this->price,
            'description' => $this->description,
        ];

        if ($this->image) {
            $data['image'] = $this->image->store('products');
        }

        return $data;
    }
}

// ProductService.php
public function createProduct(Request $request)
{
    $productData = ProductData::fromRequest($request);
    return $this->productRepo->create($productData->toArray());
}
```

## Files Modified
### Frontend
- `ECommerceFrontEnd/src/pages/CartPage.tsx`
- `ECommerceFrontEnd/src/hooks/useCart.ts`
- `ECommerceFrontEnd/src/interfaces/index.ts`
- `ECommerceFrontEnd/src/components/QuantitySelector.tsx`

### Backend
- `ECommerceBackEnd/app/Services/Product/ProductService.php`
- `ECommerceBackEnd/app/Exceptions/AuthException.php`
- `ECommerceBackEnd/app/DTOs/ProductData.php`

## Dependencies
### Frontend
- React Router DOM (for navigation)
- Lucide React (for icons)
- Custom UI components (Button, Table components)
- Custom hooks (useCart)
- Redux Toolkit (state management)

### Backend
- Laravel Framework
- PHP 8.x
- Custom DTOs and Exceptions

## Future Improvements
1. **Frontend**
   - Add loading states for cart operations
   - Implement error handling for failed cart operations
   - Add animations for cart item removal
   - Consider implementing cart persistence
   - Add unit tests for the useCart hook
   - Implement comprehensive error boundaries
   - Add performance monitoring

2. **Backend**
   - Implement comprehensive logging system
   - Add request validation middleware
   - Enhance API documentation
   - Implement rate limiting
   - Add caching layer for frequently accessed data
   - Implement comprehensive test suite

3. **General**
   - Add CI/CD pipeline
   - Implement automated testing
   - Add performance monitoring
   - Enhance security measures
   - Implement comprehensive documentation 