from django.shortcuts import render
from django.utils import timezone
from .models import Post
from django.shortcuts import render, get_object_or_404
from .forms import PostForm
from django.shortcuts import redirect
# Create your views here.


def post_home(request):
    posts = Post.objects.all()
    return render(request, 'map/home.html', {'posts' : posts })

def post_new(request):
    if request.method == "POST":
        form = PostForm(request.POST)
        if form.is_valid():
            post = form.save(commit=False)
            post.user = request.user
            post.published_date = timezone.now()
            post.save()
            return redirect('post_home')
    else:
        form = PostForm()
    return render(request, 'map/post_edit.html', {'form': form})

def post_edit(request, pk):
    posts = get_object_or_404(Post, pk=pk)
    if request.method == "POST":
        form = PostForm(request.POST, instance=post)
        if form.is_valid():
            posts = form.save(commit=False)
            posts.author = request.user
            posts.published_date = timezone.now()
            posts.save()
            return redirect('post_detail', pk=posts.pk)
    else:
        form = PostForm(instance=posts)
    return render(request, 'map/post_edit.html', {'form': form})