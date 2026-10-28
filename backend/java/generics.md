 Generics in Java are a feature that allows classes, interfaces, and methods to operate on different data types while providing compile-time type safety. They allow programmers to write reusable code without specifying a particular data type in advance.

Advantages of Generics
Type safety: Detects type errors at compile time.

Code reusability: The same code can be used with different data types.

No type casting: Reduces the need for explicit type casting.

Easy maintenance: Makes code more readable and manageable.

class Box<T> {
    T value;

    void set(T value) {
        this.value = value;
    }

    T get() {
        return value;
    }
}

public class Main {
    public static void main(String[] args) {
        Box<Integer> b = new Box<>();
        b.set(100);

        System.out.println(b.get());
    }
}

1. Multiple Generics in Java
A class or method can have more than one type parameter. Each parameter represents a different data type.

Syntax:


java
class ClassName<T, U> {
    // code
}
T represents the first type.

U represents the second type.

You can use other names, such as K, V, and E.

extends in Generics (Bounded Type Parameters)
The extends keyword restricts a generic type parameter to a particular class or its subclasses, or to types that implement a specified interface.

Syntax:


java
class ClassName<T extends Number> {
    // code
}
This allows types such as Integer, Double, and Float, because they extend Number.

3. Multiple Bounds Using &
A generic type parameter can have more than one bound. Use extends for the first bound and & for additional bounds.

Syntax:


java
class MyClass<T extends ClassA & InterfaceB & InterfaceC> {
}