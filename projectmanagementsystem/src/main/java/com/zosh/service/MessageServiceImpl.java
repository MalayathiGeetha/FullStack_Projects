package com.zosh.service;

import com.zosh.model.Chat;
import com.zosh.model.Message;
import com.zosh.model.Project;
import com.zosh.model.User;
import com.zosh.repository.MessageRepository;
import com.zosh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MessageServiceImpl implements MessageService{

    @Autowired
    private ProjectService projectService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private MessageRepository messageRepository;

    @Override
    public Message sendMessage(Long senderId, Long projectId, String content) throws Exception {
        User sender=userRepository.findById(senderId)
                .orElseThrow(()->new Exception("User not found with id : "+senderId));
        Chat chat=projectService.getProjectById(projectId).getChat();

        Message message=new Message();
        message.setChat(chat);
        message.setContent(content);
        message.setSender(sender);
        message.setCreatedAt(LocalDateTime.now());
        Message savedMessage=messageRepository.save(message);

        chat.getMessages().add(savedMessage);
        return savedMessage;

    }

    @Override
    public List<Message> getMessageByProjectId(Long projectId) throws Exception {
        Chat chat=projectService.getChatByProjectId(projectId);

        return messageRepository.findByChatIdOrderByCreatedAtAsc(chat.getId());
    }
}
