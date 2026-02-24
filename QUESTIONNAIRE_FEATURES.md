# Questionnaire Features Implementation

## Completed Features

### 1. Multiple Choice Selection ✅
- Questions can now support multiple answer selection
- Controlled by `allow_multiple` field in Question model
- UI shows checkboxes for multiple choice, radio buttons for single choice
- Backend properly handles `choices_ids` array for multiple selections

### 2. File Upload Support ✅
- Users can upload supporting documents for each question
- Multiple files can be uploaded per question
- File preview with name and size display
- Remove file functionality before submission
- Files are uploaded to `/api/v1/documents/` endpoint after answer is saved

### 3. Submit Button Validation ✅
- Submit button is disabled until current question is answered
- Loading state during submission
- Prevents accidental submission without answering
- Clear visual feedback with disabled state

## Technical Implementation

### Frontend (Next.js)
**File**: `frontend/app/questionnaire/[id]/page.tsx`

- State management for uploaded files using Map
- File upload handler with multiple file support
- File removal functionality
- FormData API for multipart file upload
- Proper error handling and user feedback

### Backend (Django)
**Files**: 
- `sustindex-/questionnaire/models.py` - UserDocument model
- `sustindex-/questionnaire/api_views.py` - UserDocumentViewSet
- `sustindex-/questionnaire/serializers.py` - UserDocumentSerializer

- UserDocument model with ForeignKey to Answer
- File upload to `user_documents/` directory
- File size tracking and display
- Proper permissions (users can only access their own documents)

## API Endpoints

### Upload Document
```
POST /api/v1/documents/
Content-Type: multipart/form-data

FormData:
- answer: <answer_id>
- title: <file_name>
- file: <file_object>
```

### Get Documents
```
GET /api/v1/documents/
Returns: List of user's uploaded documents
```

## Usage Flow

1. User answers a question (single or multiple choice)
2. User optionally uploads supporting documents
3. User clicks "Next" - answer and files are saved
4. Process repeats for all questions
5. User clicks "Submit Assessment" on last question
6. All data is saved and user is redirected to results page

## Notes

- File uploads are optional for all questions
- Files are only uploaded after the answer is successfully saved
- Each file is linked to a specific answer via the `answer` foreign key
- Users can only view/access their own uploaded documents
- File size is automatically calculated and stored
