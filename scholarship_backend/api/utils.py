# utils.py

from rest_framework.response import Response

def send_response(success, message, data=None, status_code=200):
    response_data = {
        'success': success,
        'message': message,
    }
    if data is not None:
        response_data['data'] = data

    
    print(response_data)
    return Response(response_data, status=status_code)