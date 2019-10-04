"""book_recommendation URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# Reference: https://buildmedia.readthedocs.org/media/pdf/django-tastypie/latest/django-tastypie.pdf
# Hooks up to the resources. Accepts the requests and connects it back to the resources. 

from django.conf.urls import url, include
from django.contrib import admin
from django.urls import path
from api.resources import BookResource, UserResource, ReviewsResource, BookGenreMappingResource, RecommendationResource
book_resource = BookResource()
review_resource = ReviewsResource()
user_resource = UserResource()
genre_resource = BookGenreMappingResource()
recommend_resource = RecommendationResource()

urlpatterns = [
    url(r'^admin/', admin.site.urls),
	url(r'^api/', include(book_resource.urls)),
	url(r'^api/', include(review_resource.urls)),
	url(r'^api/', include(user_resource.urls)),
	url(r'^api/', include(genre_resource.urls)),
	url(r'^api/', include(recommend_resource.urls)),
]