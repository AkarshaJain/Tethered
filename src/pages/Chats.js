import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  TextField,
  Button,
  IconButton,
  Badge,
  InputAdornment,
  Card,
  CardHeader,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

/* ───────────────────────── styled helpers ───────────────────────── */

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 10,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
}));

const StyledChatItem = styled(ListItem)(({ active }) => ({
  borderRadius: 8,
  marginBottom: 8,
  cursor: 'pointer',
  backgroundColor: active ? 'rgba(46,59,85,0.1)' : 'transparent',
  '&:hover': {
    backgroundColor: active
      ? 'rgba(46,59,85,0.15)'
      : 'rgba(0,0,0,0.04)',
  },
}));

/* key change: minHeight:0 instead of fixed maxHeight */
const MessageList = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  minHeight: 0,
  overflow: 'auto',
  padding: theme.spacing(2),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const MessageItem = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'sentByMe',
})(({ sentByMe }) => ({
  display: 'flex',
  flexDirection: sentByMe ? 'row-reverse' : 'row',
  alignItems: 'flex-start',
  gap: 8,
}));

const MessageBubble = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'sentByMe',
})(({ sentByMe }) => ({
  backgroundColor: sentByMe ? '#61082b' : '#f0f2f5',
  color: sentByMe ? '#fff' : 'inherit',
  borderRadius: 12,
  padding: '12px 16px',
  maxWidth: '70%',
  wordWrap: 'break-word',
}));

/* ───────────────────────── component ───────────────────────── */

const Chats = () => {
  const {
    user,
    allChatGroups,
    selectedChat,
    setSelectedChat,
    sendMessage,
  } = useApp();

  const { groupId } = useParams();
  const navigate = useNavigate();
  const messageListRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [messageText, setMessageText] = useState('');

  /* auto‑scroll */
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight;
    }
  }, [selectedChat]);

  /* pick chat from URL or default */
  useEffect(() => {
    if (groupId) {
      const chat = allChatGroups.find(
        (g) => g.id === Number(groupId)
      );
      if (chat) setSelectedChat(chat);
    } else if (allChatGroups.length && !selectedChat) {
      setSelectedChat(allChatGroups[0]);
      navigate(`/chats/${allChatGroups[0].id}`, { replace: true });
    }
  }, [groupId, allChatGroups, selectedChat, setSelectedChat, navigate]);

  const filteredChatGroups = allChatGroups.filter((g) =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim() && selectedChat) {
      sendMessage(selectedChat.id, messageText.trim());
      setMessageText('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    navigate(`/chats/${chat.id}`);
  };

  const timeFmt = (ts) =>
    new Date(ts).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });

  /* ───────────────────────── render ───────────────────────── */

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Grid
        container
        spacing={3}
        /* no horizontal scrollbar flash */
        sx={{ height: 'calc(100vh - 160px)', overflow: 'hidden' }}
        wrap="nowrap"
      >
        {/* ─── left column ─── */}
        <Grid
          item
          xs={6}
          md={4}
          lg={3}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          <StyledPaper sx={{ flexGrow: 1 }}>
            <Typography variant="h6" gutterBottom>
              Chat Groups
            </Typography>

            <TextField
              fullWidth
              placeholder="Search groups…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="outlined"
              size="small"
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <List sx={{ overflow: 'auto', flexGrow: 1 }}>
              {filteredChatGroups.map((chat) => (
                <StyledChatItem
                  key={chat.id}
                  active={selectedChat?.id === chat.id ? 1 : 0}
                  onClick={() => handleSelectChat(chat)}
                  button
                >
                  <ListItemAvatar>
                    <Badge
                      color="error"
                      variant="dot"
                      invisible={chat.id % 3 !== 0}
                    >
                      <Avatar src={chat.image} variant="rounded" />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.name}
                    secondary={`${chat.members} members`}
                    primaryTypographyProps={{
                      fontWeight:
                        selectedChat?.id === chat.id ? 'bold' : 'normal',
                    }}
                  />
                </StyledChatItem>
              ))}
            </List>

            <Button
              fullWidth
              variant="contained"
              sx={{
                mt: 2,
                backgroundColor: '#61082b',
                '&:hover': { backgroundColor: '#484b50' },
              }}
            >
              Create New Group
            </Button>
          </StyledPaper>
        </Grid>

        {/* ─── right column ─── */}
        <Grid
          item
          xs={6}
          md={8}
          lg={9}
          sx={{ display: 'flex', flexDirection: 'column' }}
        >
          {selectedChat ? (
            <StyledPaper sx={{ flexGrow: 1 }}>
              {/* header */}
              <Box
                sx={{
                  pb: 2,
                  borderBottom: '1px solid rgba(0,0,0,0.12)',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={selectedChat.image}
                    variant="rounded"
                    sx={{ mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">
                      {selectedChat.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {selectedChat.members} members
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {selectedChat.description}
                </Typography>
              </Box>

              {/* messages */}
              <MessageList ref={messageListRef}>
                {selectedChat.messages.map((m) => (
                  <MessageItem
                    key={m.id}
                    sentByMe={m.user.id === user.id}
                  >
                    {m.user.id !== user.id && (
                      <Avatar
                        src={m.user.avatar}
                        sx={{ width: 36, height: 36 }}
                      />
                    )}
                    <Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 0.5,
                          flexDirection:
                            m.user.id === user.id
                              ? 'row-reverse'
                              : 'row',
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ mx: 1 }}
                        >
                          {m.user.id === user.id ? 'You' : m.user.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                        >
                          {timeFmt(m.timestamp)}
                        </Typography>
                      </Box>
                      <MessageBubble sentByMe={m.user.id === user.id}>
                        <Typography variant="body2">
                          {m.content}
                        </Typography>
                      </MessageBubble>
                    </Box>
                  </MessageItem>
                ))}
              </MessageList>

              {/* input */}
              <Box
                sx={{
                  mt: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <IconButton color="primary">
                  <AttachFileIcon />
                </IconButton>
                <IconButton color="primary">
                  <EmojiEmotionsIcon />
                </IconButton>
                <TextField
                  fullWidth
                  multiline
                  maxRows={4}
                  placeholder="Type a message…"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === 'Enter' && !e.shiftKey && handleSendMessage()
                  }
                  variant="outlined"
                  sx={{
                    '& .MuiOutlinedInput-root': { borderRadius: 4 },
                  }}
                />
                <Button
                  variant="contained"
                  endIcon={<SendIcon />}
                  disabled={!messageText.trim()}
                  onClick={handleSendMessage}
                  sx={{
                    backgroundColor: '#61082b',
                    '&:hover': { backgroundColor: '#484b50' },
                  }}
                >
                  Send
                </Button>
              </Box>
            </StyledPaper>
          ) : (
            <StyledPaper
              sx={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography>Select a chat group</Typography>
            </StyledPaper>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chats;
