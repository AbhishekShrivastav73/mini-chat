const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');

exports.sendRequest = async (req, res) => {
  const { receiverId } = req.body;

  // Already friends?
  const user = await User.findById(req.userId);
  if (user.friends.includes(receiverId)) {
    return res.status(400).json({ msg: "Already friends" });
  }

  // Already sent?
  const existing = await FriendRequest.findOne({
    sender: req.userId,
    receiver: receiverId,
    status: 'pending'
  });

  if (existing) return res.status(400).json({ msg: "Already sent request" });

  const request = await FriendRequest.create({
    sender: req.userId,
    receiver: receiverId
  });

  res.status(201).json(request);
};

exports.getRequests = async (req, res) => {
  const requests = await FriendRequest.find({
    receiver: req.userId,
    status: 'pending'
  }).populate('sender', 'name email profilePic');

  res.json(requests);
};

exports.acceptRequest = async (req, res) => {
  const { requestId } = req.params;

  const request = await FriendRequest.findById(requestId);
  if (!request || request.status !== 'pending') {
    return res.status(404).json({ msg: "Request not found or already handled" });
  }

  request.status = 'accepted';
  await request.save();

  // Add to friends
  await User.findByIdAndUpdate(request.sender, {
    $push: { friends: request.receiver }
  });

  await User.findByIdAndUpdate(request.receiver, {
    $push: { friends: request.sender }
  });

  res.json({ msg: "Friend added!" });
};

exports.rejectRequest = async (req, res) => {
  const { requestId } = req.params;
  await FriendRequest.findByIdAndUpdate(requestId, { status: 'rejected' });
  res.json({ msg: "Request rejected" });
};

exports.getFriends = async (req, res) => {
  const user = await User.findById(req.userId).populate('friends', 'name email profilePic');
  res.json(user.friends);
};
