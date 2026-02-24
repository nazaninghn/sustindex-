# Testing Guide for Questionnaire Features

## Prerequisites
- Backend running on http://localhost:8000
- Frontend running on http://localhost:3000
- User account created and logged in

## Test Cases

### Test 1: Single Choice Questions
1. Navigate to `/surveys` page
2. Click "Start Assessment" on any survey
3. Verify radio buttons appear for single-choice questions
4. Select one answer
5. Verify only one answer can be selected at a time
6. Click "Next" button
7. Verify answer is saved (no error messages)

### Test 2: Multiple Choice Questions
1. Continue through questionnaire
2. Find a question with "You can select multiple answers" message
3. Verify checkboxes appear instead of radio buttons
4. Select multiple answers
5. Verify all selected answers are highlighted
6. Click "Next" button
7. Verify all selected answers are saved

### Test 3: File Upload
1. On any question, scroll to "Upload Supporting Documents" section
2. Click "Choose File" or drag files
3. Select one or more files
4. Verify files appear in the list with:
   - File icon
   - File name
   - File size in KB
   - Remove button (X)
5. Click remove button on a file
6. Verify file is removed from list
7. Upload files again
8. Click "Next" button
9. Verify files are uploaded (check browser network tab)

### Test 4: Submit Button Validation
1. Navigate to last question
2. Verify "Submit Assessment" button is disabled
3. Try clicking it - nothing should happen
4. Answer the question
5. Verify button becomes enabled
6. Click "Submit Assessment"
7. Verify loading state appears ("Submitting...")
8. Verify redirect to results page

### Test 5: Navigation with Files
1. Start a new questionnaire
2. Answer first question and upload files
3. Click "Next"
4. Click "Previous" to go back
5. Verify uploaded files are still shown
6. Click "Next" again
7. Verify files are not re-uploaded (check network tab)

## Expected API Calls

### When clicking "Next" or "Submit":
```
POST /api/v1/answers/
{
  "attempt": <attempt_id>,
  "question": <question_id>,
  "choice": <choice_id> OR "choices_ids": [<id1>, <id2>]
}

Response: { "id": <answer_id>, ... }
```

### For each uploaded file:
```
POST /api/v1/documents/
Content-Type: multipart/form-data

FormData:
- answer: <answer_id>
- title: <filename>
- file: <file_blob>
```

### When completing questionnaire:
```
POST /api/v1/attempts/<attempt_id>/complete/

Response: {
  "attempt": { ... },
  "scores": { ... }
}
```

## Common Issues and Solutions

### Issue: Files not uploading
- Check browser console for errors
- Verify backend MEDIA_URL and MEDIA_ROOT are configured
- Check file permissions on server
- Verify Content-Type header is set to multipart/form-data

### Issue: Submit button stays disabled
- Verify an answer is selected
- Check browser console for JavaScript errors
- Verify answer state is being updated correctly

### Issue: Multiple choice not working
- Verify question has `allow_multiple=True` in database
- Check that choices_ids array is being sent to API
- Verify backend serializer handles choices_ids field

## Manual Database Verification

### Check uploaded documents:
```sql
SELECT * FROM questionnaire_userdocument 
WHERE answer_id IN (
  SELECT id FROM questionnaire_answer 
  WHERE attempt_id = <your_attempt_id>
);
```

### Check multiple choice answers:
```sql
SELECT a.id, a.question_id, c.text 
FROM questionnaire_answer a
JOIN questionnaire_answer_choices ac ON a.id = ac.answer_id
JOIN questionnaire_choice c ON ac.choice_id = c.id
WHERE a.attempt_id = <your_attempt_id>;
```
