package com.zosh.controller;

import com.zosh.model.Comments;
import com.zosh.model.User;
import com.zosh.request.CreateCommentRequest;
import com.zosh.response.MessageResponse;
import com.zosh.service.CommentsService;
import com.zosh.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {
    @Autowired
    private CommentsService commentsService;
    @Autowired
    private UserService userService;

    @PostMapping
    public ResponseEntity<Comments> createComment(@RequestBody CreateCommentRequest req,
                                                  @RequestHeader("Authorization")String jwt)throws Exception{
        User user=userService.findUserProfileByJwt(jwt);
        Comments createdComment=commentsService.createComment(req.getIssueId(),user.getId(),req.getContent());

        return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
    }

    @DeleteMapping("/{commentId}")
    public ResponseEntity<MessageResponse> deleteComment(@PathVariable Long commentId,
                                                         @RequestHeader("Authorization")String jwt) throws  Exception{
        User user=userService.findUserProfileByJwt(jwt);
        commentsService.deleteComment(commentId, user.getId());
        MessageResponse res=new MessageResponse();
        res.setMessage("comment deleted successfully");
        return new ResponseEntity<>(res,HttpStatus.OK);
    }

    @GetMapping("/{issueId}")
    public ResponseEntity<List<Comments>> deleteComment(@PathVariable Long issueId){
        List<Comments> comments=commentsService.findCommentByIssueId(issueId);
        return new ResponseEntity<>(comments,HttpStatus.OK);
    }
}
