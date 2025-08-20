import pygame, sys
from pygame.locals import *
from dot import *
from ball import *
import random

pygame.init()

# Sets width and height of our screen
size = (width, height) = (400, 700)
screen = pygame.display.set_mode(size)
# Clock for the framerate
clock = pygame.time.Clock()
# bg color
bg_color = (0,0,0)
state = None
ball_images = ["images/sphere-08.png", "images/sphere-06.png",
               "images/sphere-11.png", "images/sphere-07.png",
               "images/sphere-12.png", "images/sphere-02.png"]

def initialize(dots, current_ball):
    global state
    state = "aiming"
    balls = pygame.sprite.Group()
    current_ball.add(Ball((200 - 17, 650 - 17), random.choice(ball_images)))
    for i in range(4):
        dots.add(AimingDot(30+35 * i))
    for i in range(6):
        if i % 2 == 0:
            #Even row
            for j in range(11):
                balls.add(Ball((7+34*j, 10+30*i), random.choice(ball_images)))
            else:
                # odd row
                for j in range(10):
                    balls.add(Ball((24+34)))

def main():
    global screen, state
    dots = pygame.sprite.Group()
    current_ball = pygame.sprite.GroupSingle()
    initialize(dots, current_ball)
    backboard = pygame.Rect(0,0, 400, 10)
    line = pygame.Rect(0,600, 400, 10)
    #Game Loop
    while True:
        # Set frame rate
        clock.tick(60)
        # Set pygame options (Fullscreen, quit, etc...)
        for event in pygame.event.get():
            if event.type == QUIT:
                sys.exit()
            if event.type == KEYDOWN:
                # screen controls
                if event.key == K_f:
                    screen = pygame.display.set_mode(size, FULLSCREEN)
                elif event.key == K_ESCAPE:
                    screen = pygame.display.set_mode(size)
                elif event.key == K_SPACE:
                    if state == "aiming":
                        #Fire the ball
                        state = "fired"
                        #Set the speed of the ball/ fire it
                        current_ball.sprite.set_speed(dots.sprites()[0].angle)
        keys = pygame.key.get_pressed()
        if keys[K_RIGHT]:
            dots.update(1)
        if keys[K_LEFT]:
            dots.update(-1)
        if state == "fired":
            # update current ball
           current_ball.sprite.update()
        screen.fill(bg_color)
        pygame.draw.rect(screen, (153, 0, 0), backboard)
        pygame.draw.rect(screen, (0, 77, 153), line)
        dots.draw(screen)
        current_ball.draw(screen)
        pygame.display.flip()

if __name__ == "__main__":

    main()