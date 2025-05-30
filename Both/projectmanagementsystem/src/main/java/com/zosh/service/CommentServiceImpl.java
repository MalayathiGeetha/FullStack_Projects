package com.zosh.service;


import com.zosh.model.Comments;
import com.zosh.model.Issue;
import com.zosh.model.User;
import com.zosh.repository.CommentRepository;
import com.zosh.repository.IssueRepository;
import com.zosh.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentServiceImpl implements  CommentsService{
    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private IssueRepository issueRepository;
    @Autowired
    private UserRepository userRepository;




    @Override
    public Comments createComment(Long issueId, Long userId, String content) throws Exception {
        Optional<Issue> issueOptional=issueRepository.findById(issueId);
        Optional<User> userOptional=userRepository.findById(userId);

        if(issueOptional.isEmpty()){
            throw new Exception("Issue not found with id "+issueId);
        }
        if(userOptional.isEmpty()){
            throw new Exception(("User not found with id "+userId));
        }
        Issue issue=issueOptional.get();
        User user=userOptional.get();
        Comments comments=new Comments();
        comments.setIssue(issue);
        comments.setUser(user);
        comments.setCreatedDateTime(LocalDateTime.now());
        comments.setContent(content);

        Comments savedComment=commentRepository.save(comments);
        issue.getComment().add(savedComment);
        return savedComment;
    }

    @Override
    public void deleteComment(Long commentId, Long userId) throws Exception {
        Optional<Comments> commentsOptional=commentRepository.findById(commentId);
        Optional<User> userOptional=userRepository.findById(userId);

        if(commentsOptional.isEmpty()){
            throw new Exception("Comment not found with id "+commentId);
        }
        if(userOptional.isEmpty()){
            throw new Exception("user not found with id "+userId);
        }
        Comments comments=commentsOptional.get();
        User user=userOptional.get();
        if(comments.getUser().equals(user)){
            commentRepository.delete(comments);
        }else{
            throw new Exception("User does not have permission to delete this comment!!");
        }
    }



    @Override
    public List<Comments> findCommentByIssueId(Long issueId) {

        return commentRepository.findByIssueId(issueId);
    }
}
