"""
Question:

Implement a class Child that inherits from two already implemented
classes, Parent1 and Parent2.

Both parent classes implement two methods:
- fun1()
- fun2()

Requirements:
1. Child.fun1() should:
   - print "Child fun1"
   - call Parent1's fun1()
   - call Parent2's fun1()

2. Child.fun2() should:
   - print "Child fun2"
   - call Parent2's fun2()
   - call Parent1's fun2()

Expected Output:

Child fun1
Parent1 fun1
Parent2 fun1
Child fun2
Parent2 fun2
Parent1 fun2
"""

class Parent1:
    def fun1(self):
        print("Parent1 fun1")

    def fun2(self):
        print("Parent1 fun2")


class Parent2:
    def fun1(self):
        print("Parent2 fun1")

    def fun2(self):
        print("Parent2 fun2")


class Child(Parent1, Parent2):

    def fun1(self):
        print("Child fun1")
        Parent1.fun1(self)
        Parent2.fun1(self)

    def fun2(self):
        print("Child fun2")
        Parent2.fun2(self)
        Parent1.fun2(self)


c = Child()

c.fun1()
c.fun2()


"""
- Clears all active connections.
"""

class ConnectionException(Exception):
    pass


class Caller:
    def __init__(self, name):
        self.name = name


class CommsHandler:

    def __init__(self):
        self.active_connections = []

    def connect(self, user1, user2):

        if user1.name == user2.name:
            raise ConnectionException(
                f"{user1.name} cannot connect with {user2.name}"
            )

        if len(self.active_connections) != 0:
            raise ConnectionException(
                "Connection in use. Please try later"
            )

        self.active_connections = [user1, user2]

        return (
            f"Connection established between "
            f"{user1.name} and {user2.name}"
        )

    def hangup(self, user1, user2):

        if user1.name == user2.name:
            raise ConnectionException(
                f"{user1.name} cannot hangup with {user2.name}"
            )

        connected = (
            self.active_connections == [user1, user2] or
            self.active_connections == [user2, user1]
        )

        if not connected:
            raise ConnectionException(
                f"{user1.name} and {user2.name} "
                f"not found in the communication channel"
            )

        self.active_connections = []

        return f"{user1.name} and {user2.name} are disconnected"

    def clear_all(self):
        self.active_connections = []


comms = CommsHandler()

u1 = Caller("Hana")
u2 = Caller("Luca")

print(comms.connect(u1, u2))
print(comms.hangup(u1, u2))