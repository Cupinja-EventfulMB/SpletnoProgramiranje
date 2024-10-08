import User from '../models/User.js';
import Event from '../models/Event.js';

export const getAll = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getOne = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await User.findById(id);
        res.status(200).json(event);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const create = async (req, res) => {
    try {
        const { name, email, password, phoneNumber, dateOfBirth, address } = req.body;
        console.log(req.body);
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          phoneNumber,
          dateOfBirth,
          address,
          IPaddress: req.ip,
        });
    
        const user = await newUser.save();
        res.status(200).json(user);
      } catch (err) {
        console.log(err)
        return res.status(500).json({ error: err.message });
      }

};

export const update = async (req, res) => {
    const { id } = req.params;
    const { name, email, phoneNumber, dateOfBirth, IPaddress, address, favoriteCategories, events, notifications } = req.body;

    try {
        const user = await User.findById(id);

        if (user) {
            user.name = name;
            user.email = email;
            user.phoneNumber = phoneNumber;
            user.dateOfBirth = dateOfBirth;
            user.IPaddress = IPaddress;
            user.address = address;
            user.favoriteCategories = favoriteCategories;
            user.events = events;
            user.notifications = notifications;

            await user.save();
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};


export const remove = async (req, res) => {
    const { id } = req.params;
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const getUserEvents = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
      const user = await User.findById(id);
      const currentDate = new Date();
      const going = [];
      const interested = [];
  
      for (const id of user.events.going) {
        const e = await Event.findById(id);
        going.push(e);
      }
  
      const getInterested = async () => {
        for (const id of user.events.interested) {
          const e = await Event.findById(id);
          interested.push(e);
        }
      };
  
      await getInterested();
  
      console.log("Going: ", going, "Interested: ", interested);
  
      const goingEvents = going.filter((event) => {
        return event.date >= currentDate;
      });
  
      const visitedEvents = going.filter((event) => {
        return event.date < currentDate;
      });
  
      console.log("Going: ", goingEvents, "Interested: ", interested);
  
      res
        .status(200)
        .json({ going: goingEvents, visited: visitedEvents, interested: interested });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
