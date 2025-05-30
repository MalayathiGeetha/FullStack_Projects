package com.zosh.service;

import com.zosh.model.Comments;

import java.util.List;

public interface CommentsService {
    Comments createComment(Long issueId, Long userId, String comment) throws Exception;

    void deleteComment(Long commentId,Long userId) throws Exception;
    List<Comments> findCommentByIssueId(Long issueId);
}
