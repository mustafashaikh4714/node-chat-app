// addUser(Id, name, room)
// removeUser(Id)
// getUser(Id)
// getUserList(room)


class Users {
    constructor () {
        this.users = [];
    }

    addUser(id, name, room) {
     var user = {id, name, room};
     this.users.push(user);
     return user;
    }
    removeUser(id) {
        var user = this.getUser(id);

        if (user) {
          this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
        
        // var res
        // if(myuser) {
        //     console.log('we eant to remove this object', myuser);
            
        //     var index = this.users.indexOf(myuser)
        //     res = this.users.splice(index, 1)
        //     return res;
        // }
    }
    getUser(id) {
    return this.users.filter((user) => user.id === id)[0]
    }

    getUserList(room) {
    var users = this.users.filter((user) => user.room === room);
    var nameArray = users.map((user) => user.name);

    return nameArray;
    }
}

module.exports = {Users};